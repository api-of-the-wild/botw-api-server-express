#!/bin/bash

CURRENT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd -P )"
CURRENT_DIR="${CURRENT_DIR:?}"
SCRIPTS_DIR="$(realpath "${CURRENT_DIR}/..")"
ROOT_DIR="$(realpath "${SCRIPTS_DIR}/..")"

. "${SCRIPTS_DIR}/lib.sh"


# @param containerId   $1   The container id to use when talking to docker daemon
# @param portNumber    $2   The port number bound inside the container
#
# Returns (via stdout) the local port bound to the provided remote port on the
#  provided docker container
getDockerPortMapping() {
  docker port $1 | grep -E "^$2" | awk -F: '{print $2}'
}

dockerComposeUp() {
  # TODO: wrap this in an if statement -- rebuild flag
  docker-compose build --no-cache
  
  # docker-compose up: Builds, (re)creates, starts, and attaches to containers for a service.
  #   --detach - Detached mode: Run containers in the background, print new container names.
  #   --force-recreate - Recreate containers even if their configuration and image haven't changed.
  docker-compose up --detach --force-recreate
  DC_CODE=$?

  if [ ${DC_CODE} -ne 0 ]; then
    # Introspection
    docker-compose logs
    docker-compose ps

    exit ${DC_CODE}
  fi
}

dockerComposeDown() {
  # docker-compose rm: Removes stopped service containers.
  #   -f, --force - Don't ask to confirm removal.
  #   -s, --stop - Stop the containers, if required, before removing.
  #   -v - Remove any anonymous volumes attached to containers.
  docker-compose rm --force --stop -v
}

dockerComposeRestart() {
  dockerComposeDown
  dockerComposeUp
}

dockerComposeLog() {
  FILE=$1
  docker-compose logs > ${FILE}
}

dockerContainerLog() {
  CONTAINER=$1
  FILE=$2
  docker logs ${CONTAINER} > ${FILE}
}

dockerPostgresOpen() {
  docker exec -it api_of_the_wild_db_1 psql -U admin botw
}

# TODO: refactor these two build functions
dockerBuildApp() {
  docker build -f src/Dockerfile -t kwhitejr/botw-server-express .
}

dockerBuildTestRunner() {
  docker build -f test/Dockerfile -t kwhitejr/botw-test-runner .
}

dockerExecuteTestRunner() {
  IMAGE_NAME="kwhitejr/botw-test-runner"

  echo "Build new ${IMAGE_NAME} image..."
  dockerBuildTestRunner

  echo "Run ${IMAGE_NAME} executable test container..."
  docker run -it --rm --network container:api_of_the_wild_app_1 kwhitejr/botw-test-runner
}
