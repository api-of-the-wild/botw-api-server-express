/* eslint-disable no-unused-vars */

const chai = require("chai");
const { spy } = require("sinon");
const { expect } = chai;

const { asyncMiddleware } = require("../../../src/utilities/middleware");

describe("asyncMiddleware", () => {
  let error;
  let next;

  beforeEach(() => {
    error = new Error("catch me!");
    next = spy();
  });
  it("should catch exceptions of a function passed into it", () => {
    const foo = asyncMiddleware(() => {
      throw error;
    });
    expect(foo).to.throw(error);
  });

  it("should call next with the error when an async function passed into it throws", async () => {
    const foo = asyncMiddleware(async (req, res, next) => {
      throw error;
    });

    await foo(null, null, next);
    expect(next.calledWith(error)).to.be.true;
  });

  it("should call next with the arguments when an async function passed into it calls next", async () => {
    const foo = asyncMiddleware(async (req, res, next) => {
      next("test");
    });

    await foo(null, null, next);
    expect(next.calledWith("test")).to.be.true;
  });

  it("should accept a non-async function", () => {
    const foo = asyncMiddleware((req, res, next) => {
      next("test");
    });

    foo(null, null, next);
    expect(next.calledWith("test")).to.be.true;
  });

  it("should accept a non-async function erroring", async () => {
    const foo = asyncMiddleware((req, res, next) => {
      next(error);
    });

    await foo(null, null, next);
    expect(next.calledWith(error)).to.be.true;
  });

  // NB, thenables are not guaranteed to have a `catch` method.
  it("should handle thenables", async () => {
    // construct a minimalist thenable which we can fail at a specific time
    let thenable, triggerFailure;
    const registeringThenable = new Promise(res => {
      thenable = {
        then: spy((success, fail) => {
          triggerFailure = fail;
          res();
        }),
      };
    });

    // test the actual library feature
    const catchingThenable = asyncMiddleware(_ => thenable)(null, null, next);
    await registeringThenable;
    expect(thenable.then.called).to.be.true;
    expect(next.called).to.be.false;
    triggerFailure(error);
    await catchingThenable;
    expect(next.calledWith(error)).to.be.true;
  });
});
