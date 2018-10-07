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
    "/locations/:id",
    asyncMiddleware(async (request, response, next) => {
      const id = request.params.id;
      console.log(id);
      const location = await getLocation(db, id);
      response.json(location);
    })
  );

  router.get(
    "/subregions/:id",
    asyncMiddleware(async (request, response, next) => {
      const id = request.params.id;
      console.log(id);
      const location = await getSubregion(db, id);
      response.json(location);
    })
  );

  router.get(
    "/regions/:id",
    asyncMiddleware(async (request, response, next) => {
      const id = request.params.id;
      console.log(id);
      const location = await getRegion(db, id);
      response.json(location);
    })
  );

  return router;
};

module.exports = routes;
