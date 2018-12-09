const { VALID_PATHS, VALID_VERSIONS } = require("../../config.env").paths;
const {
  WEAPON_TYPE_ENUM,
  WEAPON_HANDS_ENUM,
  BOOLEAN_ENUM,
} = require("../../config.env").enums;

const validatePathMiddleware = (req, res, next) => {
  // eslint-disable-next-line no-unused-vars
  const [_, domain, resource, version, id] = req.path.split("/");
  const isDomainValid = Object.keys(VALID_PATHS).includes(domain) || false;
  const isResourceValid = VALID_PATHS[domain]
    ? VALID_PATHS[domain].includes(resource)
    : false;
  const isVersionValid = VALID_VERSIONS.includes(version) || false;

  if (!isDomainValid || !isResourceValid || !isVersionValid) {
    res.status(400).send({ message: `Requested path ${req.path} is invalid.` });
    return;
  }

  next();
};

const validateIdMiddleware = (req, res, next) => {
  const id = (req.params && req.params.id) || false;
  const isIdFalsy = !!id;
  const isIdNumber = parseInt(id) || false;

  if (!isIdFalsy) {
    res.status(400).send({ message: `Requested id ${id} is invalid.` });
    return;
  }

  if (!isIdNumber) {
    res
      .status(400)
      .send({ message: `Requested resource id ${id} is not valid type.` });
    return;
  }
  next();
};

const VALID_QUERY_PARAMS = {
  weapon_type: WEAPON_TYPE_ENUM,
  hands: WEAPON_HANDS_ENUM,
  mastermode: BOOLEAN_ENUM,
  dlc2: BOOLEAN_ENUM,
};

// TODO: include check on the query param key (not jsut value)
const validateQueryParamsMiddleware = queryParam => (req, res, next) => {
  const queryParamsArray =
    req.query && req.query[queryParam]
      ? req.query[queryParam].split(",")
      : null;

  if (queryParamsArray === null) {
    return next();
  }

  const queryParamValuesAreValid = queryParamsArray.every(val =>
    VALID_QUERY_PARAMS[queryParam].includes(val)
  );

  if (!queryParamValuesAreValid) {
    res.status(400).send({
      message: `Query parameter ${queryParam} contains one or more invalid values: ${queryParamsArray}`,
    });
    return;
  }
  next();
};

const asyncMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const enrichResponseMiddleware = (req, res, next) => {
  const path = req.originalUrl;
  const [_, domain, resource, version, id] = path.split("/");
  const self = `${req.hostname}${req.originalUrl}`;

  const domainResource = [domain, resource].join("/");
  res.body = Object.assign(res.body, {
    self,
    resource: domainResource,
    version: version.substring(0, 2),
  });
  res.send(res.body);
};

module.exports = {
  validatePathMiddleware,
  validateIdMiddleware,
  validateQueryParamsMiddleware,
  asyncMiddleware,
  enrichResponseMiddleware,
};
