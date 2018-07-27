#!/usr/bin/env bash

CURRENT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd -P )"
CURRENT_DIR="${CURRENT_DIR:?}"
SCRIPTS_DIR="$(realpath "${CURRENT_DIR}/..")"
ROOT_DIR="$(realpath "${SCRIPTS_DIR}/..")"
BIN_DIR="${ROOT_DIR}/node_modules/.bin"
TEST_DIR="${ROOT_DIR}/test/unit"
REPORTS_DIR="${ROOT_DIR}/reports/unit"
LINT_DIFF_FILE="${ROOT_DIR}/reports/lint_errors.diff"

# whichOrExit "${BIN_DIR}/eslint" "${red}You need to run ${bold}yarn install${normal}${red} to be able to proceed\n${normal}" >&2

pushd "${ROOT_DIR}" >/dev/null 

eslint() {
  "${BIN_DIR}/eslint" --ignore-path="${ROOT_DIR}/.gitignore" "${ROOT_DIR}/**/*.js"
}
  
prettier_diff() 
{ 
  yarn -s prettier $1 > $1.pretty; 
  diff $1 $1.pretty; 
  rm $1.pretty; 
} 

prettier_check() {
  rm "${LINT_DIFF_FILE}" >/dev/null 2>&1
  # Add diff of each failing file to LINT_DIFF_FILE
  ${BIN_DIR}/prettier -l --ignore-path="${ROOT_DIR}/.gitignore" "${ROOT_DIR}/**/*.json" | while read line
  do
    echo "${line}" >> "${LINT_DIFF_FILE}"
    prettier_diff "${line}" >> "${LINT_DIFF_FILE}"
    echo "" >> "${LINT_DIFF_FILE}"
  done

  # If the diff file exists then print it and return error code
  if [ -f "${LINT_DIFF_FILE}" ]; then
    cat "${LINT_DIFF_FILE}"
    errcho "${red}Formatting errors found\n"
    errcho "${normal}Full output at ${LINT_DIFF_FILE}\n"
    return 1
  fi
  # Else return success
  return 0
}

eslint && prettier_check
