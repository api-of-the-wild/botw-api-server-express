/* eslint-disable no-unused-vars*/
const router = require("express").Router();

const {
  asyncMiddleware,
  validateIdMiddleware,
  validateQueryParamsMiddleware,
  enrichResponseMiddleware,
} = require("../utilities/middleware");

const {
  getLocation,
  getSubregion,
  getRegion,
  getLocationsCollection,
  getSubregionsCollection,
  getRegionsCollection,
} = require("../queries/geography");

const routes = app => {
  const db = app.get("db");

  // GET single resource
  router.get(
    "/locations/v1/:id",
    validateIdMiddleware,
    getById(db, getLocation, "locations")
  );

  router.get(
    "/subregions/v1/:id",
    validateIdMiddleware,
    getById(db, getSubregion, "subregions")
  );

  router.get(
    "/regions/v1/:id",
    validateIdMiddleware,
    getById(db, getRegion, "regions")
  );

  // GET collection
  router.get(
    "/locations/v1",
    validateQueryParamsMiddleware("location_type"),
    // validateQueryParamsMiddleware("subregion"),
    // validateQueryParamsMiddleware("region"),
    getCollection(db, getLocationsCollection)
  );

  router.get("/subregions/v1", getCollection(db, getSubregionsCollection));

  router.get("/regions/v1", getCollection(db, getRegionsCollection));

  router.use(enrichResponseMiddleware);
  return router;
};

const getById = (db, queryFn, resource) =>
  asyncMiddleware(async (req, res, next) => {
    const id = req.params.id;

    const dbResponse = await queryFn(db, id);
    if (dbResponse === null) {
      res.status(404).send({
        message: `geography/${resource}/v1 resource with id ${id} does not exist.`,
      });
      return;
    }
    res.body = dbResponse;
    next();
  });

const getCollection = (db, queryFn) =>
  asyncMiddleware(async (req, res, next) => {
    // TODO: convert to reduce
    const filters = {};
    Object.keys(req.query).map(key => {
      const values = req.query[key].split(",");
      filters[key] = values.map(val => {
        if (val === "null") return null;
        return val;
      });
    });

    console.log(filters);

    // Db Query
    const dbResponse = await queryFn(db, filters);
    res.body = { objects: dbResponse };
    next();
  });

module.exports = routes;
