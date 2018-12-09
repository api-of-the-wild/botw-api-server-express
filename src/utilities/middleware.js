const VALID_PATHS = {
  geography: ["regions", "subregions", "locations"],
  compendium: ["weapons", "bows", "arrows", "shields"],
};
const VALID_VERSIONS = ["v1"];

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
  asyncMiddleware,
  enrichResponseMiddleware,
};
