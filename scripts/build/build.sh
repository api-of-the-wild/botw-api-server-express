#!/bin/bash

# Get directory path of *this* script file and exit if is not set, NULL, or an empty string
CURRENT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd -P )"
CURRENT_DIR="${CURRENT_DIR:?}"
SCRIPTS_DIR="${CURRENT_DIR}/.."
ROOT_DIR="${SCRIPTS_DIR}/.."
BIN_DIR="${ROOT_DIR}/node_mdules/bin"
STAGING_DIR="${ROOT_DIR}/build"
REPORT_DIR="${ROOT_DIR}/reports"

. ${CURRENT_DIR}/build.lib.sh

build

exit $?