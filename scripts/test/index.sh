#!/bin/bash

# Get directory path of *this* script file and exit if is not set, NULL, or an empty string
CURRENT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd -P )"
CURRENT_DIR="${CURRENT_DIR:?}"
SCRIPTS_DIR="$(realpath "${CURRENT_DIR}/..")"
ROOT_DIR="$(realpath "${SCRIPTS_DIR}/..")"
# TEST_DIR="${ROOT_DIR}/test/unit"
# REPORTS_DIR="${ROOT_DIR}/reports/unit"
# source the build.lib functions
# . "${SCRIPTS_DIR}/lib.sh"

set -x

yarn count_failures \
  "yarn test:lint" \
  "yarn test:depcheck" \
  "yarn test:unit" \
  "yarn test:coverage"
