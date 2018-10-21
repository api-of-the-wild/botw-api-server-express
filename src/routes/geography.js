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
    "/locations/v1/:id",
    asyncMiddleware(async (request, response, next) => {
      const id = request.params.id;
      const location = await getLocation(db, id);
      response.body = location;
      next();
    })
  );

  router.get(
    "/subregions/v1/:id",
    asyncMiddleware(async (request, response, next) => {
      const id = request.params.id;
      const subregion = await getSubregion(db, id);
      response.body = subregion;
      next();
    })
  );

  router.get(
    "/regions/v1/:id",
    asyncMiddleware(async (request, response, next) => {
      const id = request.params.id;
      const region = await getRegion(db, id);
      response.body = region;
      next();
    })
  );

  return router;
};

module.exports = routes;
