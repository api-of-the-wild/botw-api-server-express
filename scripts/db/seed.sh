#!/bin/bash

# Get directory path of *this* script file and exit if is not set, NULL, or an empty string
CURRENT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd -P )"
CURRENT_DIR="${CURRENT_DIR:?}"
SCRIPTS_DIR="$(realpath "${CURRENT_DIR}/..")"
ROOT_DIR="$(realpath "${SCRIPTS_DIR}/..")"

psql -U admin -d botw -a -f "${CURRENT_DIR}/compendium.sql"
psql -U admin -d botw -a -f "${CURRENT_DIR}/geography.sql"