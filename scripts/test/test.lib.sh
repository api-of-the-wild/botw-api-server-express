#!/bin/bash

CURRENT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd -P )"
CURRENT_DIR="${CURRENT_DIR:?}"
SCRIPTS_DIR="$(realpath "${CURRENT_DIR}/..")"
ROOT_DIR="$(realpath "${SCRIPTS_DIR}/..")"
TEST_UNIT_DIR="${ROOT_DIR}/test/unit"
TEST_INTEGRATION_DIR="${ROOT_DIR}/test/integration"
REPORTS_DIR="${ROOT_DIR}/reports"

integrationTest() {
  INTEGRATION_STAGE=$1
  export INTEGRATION_STAGE

  mocha \
    --recursive "${TEST_INTEGRATION_DIR}/**/*.js" \
    --reporter=mochawesome \
    --reporter-options reportDir="${REPORTS_DIR}/integration" \
    --require "${ROOT_DIR}/src/utilities/make_promises_safe.js"
}