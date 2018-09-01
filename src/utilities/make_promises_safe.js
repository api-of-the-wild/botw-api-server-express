"use strict";

const eventName = "unhandledRejection";

if (process.listenerCount(eventName) === 0) {
  process.on(eventName, function(err) {
    console.error(err); // eslint-disable-line no-console

    process.exit(-1);
  });
}
