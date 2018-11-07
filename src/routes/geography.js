/* eslint-disable no-unused-vars*/
const router = require("express").Router();

const {
  asyncMiddleware,
  enrichResponseMiddleware,
} = require("../utilities/middleware");

const {
  getLocation,
  getSubregion,
  getRegion,
} = require("../queries/geography");

const routes = app => {
  const db = app.get("db");

  router.get(
    "/locations/v1/:id",
    asyncMiddleware(async (req, res, next) => {
      const id = req.params.id;
      const location = await getLocation(db, id);
      if (location === null) {
        res.status(404).send({
          message: `Locations resource with id ${id} does not exist.`,
        });
        return;
      }
      res.body = location;
      next();
    })
  );

  router.get(
    "/subregions/v1/:id",
    asyncMiddleware(async (req, res, next) => {
      const id = req.params.id;
      const subregion = await getSubregion(db, id);
      if (subregion === null) {
        res.status(404).send({
          message: `Subregions resource with id ${id} does not exist.`,
        });
        return;
      }
      res.body = subregion;
      next();
    })
  );

  router.get(
    "/regions/v1/:id",
    asyncMiddleware(async (req, res, next) => {
      const id = req.params.id;
      const region = await getRegion(db, id);
      if (region === null) {
        res.status(404).send({
          message: `Regions resource with id ${id} does not exist.`,
        });
        return;
      }
      res.body = region;
      next();
    })
  );

  router.use(enrichResponseMiddleware);
  return router;
};

module.exports = routes;
