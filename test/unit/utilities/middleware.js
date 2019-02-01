/* eslint-disable no-unused-vars */

const { expect } = require("chai");
const { spy, stub } = require("sinon");

const {
  asyncMiddleware,
  enrichResponseMiddleware,
  validatePathMiddleware,
  validateIdMiddleware,
  validateQueryParamsMiddleware,
} = require("../../../src/utilities/middleware");

describe("asyncMiddleware()", () => {
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

describe("enrichResponseMiddleware()", () => {
  const MOCK_REQUEST = {
    originalUrl: "/geography/regions/v1/1",
    hostname: "https://apiofthewild",
  };

  const MOCK_RESPONSE_BODY = {
    id: 1,
    region: "Akkala",
    subregions: [],
  };

  let response, nextSpy;
  beforeEach(() => {
    response = { send: spy(), body: MOCK_RESPONSE_BODY };
    nextSpy = spy();
  });

  it("should add self, resource, and version properties to the response body", () => {
    const expectedBody = {
      id: 1,
      region: "Akkala",
      subregions: [],
      self: "https://apiofthewild/geography/regions/v1/1",
      version: "v1",
      resource: "geography/regions",
    };
    enrichResponseMiddleware(MOCK_REQUEST, response, nextSpy);

    expect(response.send.calledWith(expectedBody)).to.be.true;
    expect(nextSpy.calledOnce).to.be.true;
  });
});

describe("validatePathMiddleware()", () => {
  let req, res, next;

  beforeEach(() => {
    req = {};
    res = {
      status: stub().returnsThis(),
      send: spy(),
    };
    next = spy();
  });

  it("should call `next` if path is valid", () => {
    const testCases = [
      "/geography/regions/v1/1",
      "/geography/subregions/v1/1",
      "/geography/locations/v1/1",
    ];

    const testRunner = path => {
      req.path = path;
      validatePathMiddleware(req, res, next);
      expect(next.called).to.be.true;
    };

    testCases.forEach(testRunner);
  });

  it("should send 400 if path params are not valid", () => {
    const testCases = [
      "/BOGUS/regions/v1/1",
      "/geography/BOGUS/v1/1",
      "/geography/locations/BOGUS/1",
    ];

    const testRunner = testCase => {
      req.path = testCase;
      validatePathMiddleware(req, res, next);
      expect(res.status.calledWith(400)).to.be.true;
      // expect(res.send.calledOnce).to.be.true;
    };

    testCases.forEach(testRunner);
  });
});

describe("validateIdMiddleware()", () => {
  let req, res, next;

  beforeEach(() => {
    req = {};
    res = {
      status: stub().returnsThis(),
      send: spy(),
    };
    next = spy();
  });

  it("should call `next` if id is valid", () => {
    const testCases = ["1", "2"];

    const testRunner = testCase => {
      req.params = { id: testCase };
      validateIdMiddleware(req, res, next);
      expect(next.called).to.be.true;
    };

    testCases.forEach(testRunner);
  });

  it("should send 400 if id is falsy", () => {
    const testCases = [undefined, null, "0", false];

    const testRunner = testCase => {
      req.params = { id: testCase };
      validateIdMiddleware(req, res, next);
      expect(res.status.calledWith(400)).to.be.true;
      // expect(res.send.calledOnce).to.be.true;
    };

    testCases.forEach(testRunner);
  });
});

describe("validateQueryParamsMiddleware()", () => {
  let req, res, next;

  beforeEach(() => {
    req = {};
    res = {
      status: stub().returnsThis(),
      send: spy(),
    };
    next = spy();
  });

  it("should call `next` if no query parameters", () => {
    const testCases = [{}, { key: "" }];
    const testRunner = testCase => {
      req.query = testCase;
      validateQueryParamsMiddleware("key")(req, res, next);
      expect(next.called).to.be.true;
    };

    testCases.forEach(testRunner);
  });

  it("should call `next` when query parameters are valid", () => {
    const testCases = [
      { weapon_type: "sword" },
      { hands: "2" },
      { mastermode: "true" },
      { dlc2: "false" },
      { location_type: "shrine" },
    ];

    const testRunner = testCase => {
      req.query = testCase;
      const queryParam = Object.keys(testCase)[0];
      validateQueryParamsMiddleware(queryParam)(req, res, next);
      expect(next.called).to.be.true;
    };

    testCases.forEach(testRunner);
  });

  it("should send 400 if the query params are not valid", () => {
    const testCases = [
      { weapon_type: "banana" },
      { hands: "4" },
      { mastermode: "perhaps" },
      { dlc2: "null" },
      { location_type: "mufasa" },
    ];

    const testRunner = testCase => {
      req.query = testCase;
      const queryParam = Object.keys(testCase)[0];
      validateQueryParamsMiddleware(queryParam)(req, res, next);
      expect(res.status.calledWith(400)).to.be.true;
      // expect(res.send.calledOnce).to.be.true;
    };

    testCases.forEach(testRunner);
  });
});
