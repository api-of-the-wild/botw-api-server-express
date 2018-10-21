#!/usr/bin/env node

/* eslint-disable no-console */

const depcheck = require("depcheck");

const depcheckConfig = require("../../config.env").depcheck;

const _logDepcheckResults = results => {
  console.log(`Unused dependencies: ${results.dependencies}`); // an array containing the unused dependencies
  console.log(`Unused devDependencies: ${results.devDependencies}`); // an array containing the unused devDependencies
  console.log(`Missing dependencies:`); // a lookup containing the dependencies missing in `package.json` and where they are used
  console.log(results.missing); // a lookup containing the dependencies missing in `package.json` and where they are used
  // console.log(results.using); // a lookup indicating each dependency is used by which files
  // console.log(results.invalidFiles); // files that cannot access or parse
  // console.log(results.invalidDirs); // directories that cannot access
};

depcheck(
  depcheckConfig.projectPath,
  depcheckConfig.options,
  _logDepcheckResults
);
