/* eslint-disable no-unused-vars*/

const router = require("express").Router();

const { asyncMiddleware } = require("../utilities/middleware");
const {
  getLocation,
  getSubregion,
  getRegion,
} = require("../queries/geography");

const routes = app => {
  const db = app.get("db");

  router.get(
    "/test/v0",
    asyncMiddleware(async (req, res, next) => {
      res.body = { message: "Welcome to the RESTful BotW API!" };
      next();
    })
  );

  router.get(
    "/locations/v1/:id",
    asyncMiddleware(async (req, res, next) => {
      const id = req.params.id;
      const location = await getLocation(db, id);
      res.body = location;
      next();
    })
  );

  router.get(
    "/subregions/v1/:id",
    asyncMiddleware(async (req, res, next) => {
      const id = req.params.id;
      const subregion = await getSubregion(db, id);
      res.body = subregion;
      next();
    })
  );

  router.get(
    "/regions/v1/:id",
    asyncMiddleware(async (req, res, next) => {
      const id = req.params.id;
      const region = await getRegion(db, id);
      res.body = region;
      next();
    })
  );

  return router;
};

module.exports = routes;
