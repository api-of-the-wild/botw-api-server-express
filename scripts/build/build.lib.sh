#!/bin/bash

# Get directory path of *this* script file and exit if is not set, NULL, or an empty string
CURRENT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd -P )"
CURRENT_DIR="${CURRENT_DIR:?}"
SCRIPTS_DIR="${CURRENT_DIR}/.."
ROOT_DIR="${SCRIPTS_DIR}/.."
BIN_DIR="${ROOT_DIR}/node_mdules/bin"
STAGING_DIR="${ROOT_DIR}/build"
REPORT_DIR="${ROOT_DIR}/reports"

# source the build.lib functions
. "${SCRIPTS_DIR}/lib.sh"

cleanStaging() {
  echo "Cleaning the staging directory ${STAGING_DIR}"

  rm -rf "${STAGING_DIR}"
}

prepareStaging() {
  echo "Preparing staging environment"

  # create build directory
  mkdir -p "${STAGING_DIR}"
}

copyResources() {
  # move to build directory and copy the src directory to build
  cp -r "src" "${STAGING_DIR}/"
  cp "config.env.js" "${STAGING_DIR}/"
  cp "package.json" "${STAGING_DIR}/"
  cp "yarn.lock" "${STAGING_DIR}/"
  cp -r "api" "${STAGING_DIR}/"
  cp -r "bin" "${STAGING_DIR}/"
  cp -r "db" "${STAGING_DIR}/"
}

generateResources() {
  echo "Generating resources"

  # if [ -z "${ZIP_FILENAME}" ]; then
  #   echo "No argument supplied for lambda zip name" >&2

  #   return -1
  # fi

  pushd "${STAGING_DIR}"

  echo "Installing dependencies"

  # install production node modules to build directory to make them available for zipping
  yarn install --frozen-lockfile --production --check-files

  yarnCode=$?

  if [ $yarnCode -ne 0 ]; then
    echo "Yarn failed" >&2

    popd

    return $yarnCode
  fi
}

# zip things
package() {
  echo "Packaging build artifact"

  pushd "${STAGING_DIR}"

  zip -rq "${ZIP_FILENAME}" node_modules/* src/* config*.js

  zipCode=$?

  if [ $zipCode -eq 0 ]; then
    echo "moving ${ZIP_FILENAME} back to ${ROOT_DIR}/"

    mv "${ZIP_FILENAME}" "${ROOT_DIR}/"

    moveZipFileCode=$?
  fi

  popd

  if [ $zipCode -eq 0 ]; then
    return $moveZipFileCode
  else
    return $zipCode
  fi
}


# Create a file size report for the zip file
reportFileSize() {
  echo "Reporting file size"

  # Make sure the reports directory exists before trying to write to it
  mkdir -p "${REPORTS_DIR}"

  du -hs "${ZIP_FILENAME}" | markdownifyDuOutput > "${REPORTS_DIR}/zip_file_size.md"
  duCode=$?

  if [ $duCode -ne 0 ]; then
    echo "du returned an error, ${ZIP_FILENAME} probably does not exist, did you build?"

    return $duCode
  fi
}

# define the build function
build () {
  yarn install --check-files
  cleanStaging && prepareStaging && copyResources && generateResources
}

buildAndReport() {
  build
}