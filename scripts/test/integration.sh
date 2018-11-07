#!/usr/bin/env bash

MY_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd -P )"
MY_DIR="${MY_DIR:?}"
SCRIPTS_DIR="$(realpath "${MY_DIR}/..")"
ROOT_DIR="$(realpath "${SCRIPTS_DIR}/..")"
TEST_DIR="${ROOT_DIR}/test/integration"
SRC_DIR="${ROOT_DIR}/src"
REPORTS_DIR="${ROOT_DIR}/reports"

. "${SCRIPTS_DIR}/test/test.lib.sh"

# See test.lib
integrationTest
