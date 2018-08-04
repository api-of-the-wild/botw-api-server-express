#!/usr/bin/env bash

SCRIPTS_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd -P )"
SCRIPTS_DIR="${SCRIPTS_DIR:?}"
ROOT_DIR="$(realpath "${SCRIPTS_DIR}/..")"
# ENV_DIR="${ROOT_DIR}/.env.d"
# CACHE_DIR="${ROOT_DIR}/.cache"

# mkdir -p "${CACHE_DIR}"

# WIREMOCK_TGZ_URI="https://nc.0ti.me/index.php/s/n7RN8j8ZRmZjZWJ/download"
# WIREMOCK_TGZ_FILE="${CACHE_DIR}/wiremock.tgz"

# MARIADB_ENV="${ENV_DIR}/mariadb.env"

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