const router = require("express").Router();

const { countRegions } = require("./db_queries");

const routes = app => {
  const db = app.get("db");

  router.get("/", (request, response) => {
    response.json({ message: "Hello Geography" });
  });

  router.get("/regions/count", async (request, response, next) => {
    try {
      const total = await countRegions(db);
      response.send(`There are ${total} regions.`);
    } catch (err) {
      console.error(err);
      next();
    }
  });

  return router;
};

module.exports = routes;
