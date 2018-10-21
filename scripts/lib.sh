#!/usr/bin/env bash

SCRIPTS_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd -P )"
SCRIPTS_DIR="${SCRIPTS_DIR:?}"
ROOT_DIR="$(realpath "${SCRIPTS_DIR}/..")"
# ENV_DIR="${ROOT_DIR}/.env.d"
# CACHE_DIR="${ROOT_DIR}/.cache"

# Checks `which $1` and if a file does not exist at that path, exits with -1
#
# @param binary name    $1  The binary to check
whichOrExit() {
  if ! which $1 > /dev/null 2>&1; then
    echo "$1 must be installed" >&2

    return 1
  fi

  return 0
}

# Checks if a file exists at that path, exits with -1 if not
#
# @param file name      $1  The file to check
# @param message        $2  Optional message, defaults to:
#                           You need to install $1 to proceed
fileExistsOrExit() {
  FILE="$1"
  MSG="$2"

  if [ -z "${MSG}" ]; then
    MSG="File ${FILE} does not exist"
  fi

  if [ ! -f "${FILE}" ]; then
    errcho "${MSG}\n"

    exit -1
  fi

  return 0
}

# Checks an error code against 0, exits with -1 if it is non-zero
#
# @param code           $1  The code to check
# @param message        $2  Optional message, defaults to:
#                           Unexpected error code $1
codeZeroOrExitCode() {
  CODE=$1
  MSG="$2"

  if [ -z "${MSG}" ]; then
    MSG="Unexpected error code ${CODE}"
  fi

  if [ ${CODE} -ne 0 ]; then
    errcho "${MSG}\n"

    exit ${CODE}
  fi

  return ${CODE}
}

# `docker-compose ps wiremock`: List containers with name wiremock, .e.g
#       wiremock        docker-entrypoint.sh mysqld      Up (healthy)  0.0.0.0:8000->80/tcp
# `grep -o -E '[0-9]+->8080/tcp'`:
#     -o --only-matching - Show only the part of a matching line that matches PATTERN.
#     -E --extended-regexp - Interpret PATTERN as an extended regular expression (see below).
# `sed 's/->.*//'`: Stream EDitor, replace string ->.* with blank
getWireMockPort() {
  docker-compose ps wiremock | grep -o -E '[0-9]+->8080/tcp' | sed 's/->.*//'
}
