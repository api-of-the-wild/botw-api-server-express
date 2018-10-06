const router = require("express").Router();

const { asyncMiddleware } = require("./utilities/middleware");
const { countRegions } = require("./db_queries");

const routes = app => {
  const db = app.get("db");

  router.get("/", (request, response) => {
    response.json({ message: "Hello Geography" });
  });

  router.get(
    "/regions/count",
    asyncMiddleware(async (request, response, next) => {
      const total = await countRegions(db);
      response.send(`There are ${total} regions.`);
    })
  );

  return router;
};

module.exports = routes;
