#!/usr/bin/env bash

MY_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd -P )"
MY_DIR="${MY_DIR:?}"
SCRIPTS_DIR="$(realpath "${MY_DIR}/..")"
ROOT_DIR="$(realpath "${SCRIPTS_DIR}/..")"
TEST_DIR="${ROOT_DIR}/test/integration"
SRC_DIR="${ROOT_DIR}/src"
REPORTS_DIR="${ROOT_DIR}/reports"

. "${SCRIPTS_DIR}/docker/docker.lib.sh"
# . "${SCRIPTS_DIR}/test/test.lib.sh"

dockerComposeUp

dockerExecuteTestRunner
# DOCKER_TEST_CODE=$?

dockerComposeLog docker.integration_test.log

dockerComposeDown

# if [ ${DOCKER_TEST_CODE} -ne 0 ]; then
#   # Restore to initial state
#   dockerComposeDown

#   exit ${DOCKER_TEST_CODE}
# fi