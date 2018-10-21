#!/usr/bin/env bash

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
  # wrap this in an if statement -- rebuild flag
  docker-compose build --no-cache
  
  # docker-compose up: Builds, (re)creates, starts, and attaches to containers for a service.
  #   --detach - Detached mode: Run containers in the background, print new container names.
  #   --force-recreate - Recreate containers even if their configuration and image haven't changed.
  docker-compose up --detach --force-recreate
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

dockerPostgresOpen() {
  docker exec -it api_of_the_wild_db_1 psql -U admin botw
}

dockerBuildApp() {
  docker build -f src/Dockerfile -t kwhitejr/botw-server-express .
}