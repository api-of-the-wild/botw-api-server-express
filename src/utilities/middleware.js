const asyncMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const metadataMiddleware = (req, res, next) => {
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
  asyncMiddleware,
  metadataMiddleware,
};
