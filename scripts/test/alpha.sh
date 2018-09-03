#!/usr/bin/env bash

CURRENT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd -P )"
CURRENT_DIR="${CURRENT_DIR:?}"
SCRIPTS_DIR="$(realpath "${CURRENT_DIR}/..")"
ROOT_DIR="$(realpath "${SCRIPTS_DIR}/..")"
TEST_DIR="${ROOT_DIR}/test/integration"
REPORTS_DIR="${ROOT_DIR}/reports/integration"

. "${SCRIPTS_DIR}/lib.sh"

. "${SCRIPTS_DIR}/docker/dockerUp.sh"

export INTEGRATION_STAGE="ALPHA"
export WIREMOCK_PORT="$(getWireMockPort)"
export SAM_LOCAL_PORT=3000
export ROOT_DIR
export COMPOSE_PROJECT_NAME

# Start SAM Local on same docker network
sam local start-api --docker-network api_of_the_wild_cloud &
PID=$!

mocha \
  --colors \
  -R mochawesome \
  --reporter-options reportDir="${REPORTS_DIR}" \
  --require "${ROOT_DIR}/src/utilities/make_promises_safe.js" \
  --recursive "${TEST_DIR}/**/*.js"
MOCHA_CODE=$?

kill $PID

. "${SCRIPTS_DIR}/docker/dockerDown.sh"