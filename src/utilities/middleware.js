const VALID_PATHS = { geography: ["regions", "subregions", "locations"] };
const VALID_VERSIONS = ["v1"];

const validatePathMiddleware = (req, res, next) => {
  const [_, domain, resource, version, id] = req.path.split("/");
  const isDomainValid = Object.keys(VALID_PATHS).includes(domain) || false;
  const isResourceValid = VALID_PATHS[domain]
    ? VALID_PATHS[domain].includes(resource)
    : false;
  const isVersionValid = VALID_VERSIONS.includes(version) || false;
  const isIdFalsy = !!id;

  const isIdNumber = parseInt(id) || false;

  if (!isDomainValid || !isResourceValid || !isVersionValid || !isIdFalsy) {
    res.status(400).send({ error: `Requested path ${req.path} is invalid.` });
    return;
  }

  if (!isIdNumber) {
    res.status(400).send({ error: `Requested resource id ${id} is not valid` });
    return;
  }
  next();
};

const asyncMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const enrichResponseMiddleware = (req, res, next) => {
  const path = req.originalUrl;
  const pathParams = path.split("/");
  const self = `${req.hostname}${req.originalUrl}`;

  const resource = [pathParams[1], pathParams[2]].join("/");
  const version = pathParams[3];
  res.body = Object.assign(res.body, { self, resource, version });
  res.send(res.body);
  next();
};

module.exports = {
  validatePathMiddleware,
  asyncMiddleware,
  enrichResponseMiddleware,
};
