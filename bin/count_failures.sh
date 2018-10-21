#!/bin/bash

# Each command passed to this function will be executed individually in series.
#  After each command has run, the total count of errors for the various commands
#  will be returned as an exit code.

# RECOMMENDATION:
#   Don't use exclamation marks.  The escape characters required to make
#  that work are painful.
#   If you have a possibility of 256 errors, this function could cause you
#  to get a pass even with 256 errors due to an overflow that wasn't really
#  relevant to us.  Run `( exit 256 ); echo $?` and `( exit 255 ); echo $?`
#  to observe the difference

totalErrors=0

for cmd in "$@"; do
  # Execute in a subshell so that things like 'exit' won't break the script
  (
    eval ${cmd}
  )

  if [ $? -ne 0 ]; then
    let totalErrors=${totalErrors}+1
  fi
done

# Return the error count
exit ${totalErrors}