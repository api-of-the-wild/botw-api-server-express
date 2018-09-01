#!/usr/bin/env bash

CURRENT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd -P )"
CURRENT_DIR="${CURRENT_DIR:?}"
SCRIPTS_DIR="$(realpath "${CURRENT_DIR}/..")"
ROOT_DIR="$(realpath "${SCRIPTS_DIR}/..")"

. "${SCRIPTS_DIR}/lib.sh"

dockerComposeDown