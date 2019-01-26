#!/usr/bin/env bash

MY_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd -P )"
MY_DIR="${MY_DIR:?}"
SCRIPTS_DIR="$(realpath "${MY_DIR}/..")"
ROOT_DIR="$(realpath "${SCRIPTS_DIR}/..")"
TEST_DIR="${ROOT_DIR}/test/unit"
SRC_DIR="${ROOT_DIR}/src"
REPORTS_DIR="${ROOT_DIR}/reports"

yarn nyc \
  --all \
  --reporter=lcov \
  --reporter=json-summary \
  --reporter=text \
  --report-dir="${REPORTS_DIR}/coverage" \
  mocha \
    --recursive "${TEST_DIR}/**/*.js" \
    --reporter=mochawesome \
    --reporter-options reportDir="${REPORTS_DIR}/coverage"