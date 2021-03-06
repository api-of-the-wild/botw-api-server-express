/* eslint-disable no-unused-vars*/
const router = require("express").Router();

const {
  asyncMiddleware,
  validateIdMiddleware,
  validateQueryParamsMiddleware,
  enrichResponseMiddleware,
} = require("../utilities/middleware");

const {
  getCreature,
  getMonster,
  getMaterial,
  getWeapon,
  getBow,
  getArrow,
  getShield,
  getTreasure,
  getCreaturesCollection,
  getMonstersCollection,
  getMaterialsCollection,
  getWeaponsCollection,
  getBowsCollection,
  getArrowsCollection,
  getShieldsCollection,
  getTreasuresCollection,
} = require("../queries/compendium");

const routes = app => {
  const db = app.get("db");

  // GET by id
  router.get(
    "/creatures/v1/:id",
    validateIdMiddleware,
    validateQueryParamsMiddleware("mastermode"),
    validateQueryParamsMiddleware("dlc2"),
    getById(db, getCreature, "creatures")
  );

  router.get(
    "/monsters/v1/:id",
    validateIdMiddleware,
    validateQueryParamsMiddleware("mastermode"),
    validateQueryParamsMiddleware("dlc2"),
    getById(db, getMonster, "monsters")
  );

  router.get(
    "/materials/v1/:id",
    validateIdMiddleware,
    validateQueryParamsMiddleware("mastermode"),
    validateQueryParamsMiddleware("dlc2"),
    getById(db, getMaterial, "materials")
  );

  router.get(
    "/weapons/v1/:id",
    validateIdMiddleware,
    validateQueryParamsMiddleware("mastermode"),
    validateQueryParamsMiddleware("dlc2"),
    getById(db, getWeapon, "weapons")
  );

  router.get(
    "/bows/v1/:id",
    validateIdMiddleware,
    validateQueryParamsMiddleware("mastermode"),
    validateQueryParamsMiddleware("dlc2"),
    getById(db, getBow, "bows")
  );

  router.get(
    "/arrows/v1/:id",
    validateIdMiddleware,
    validateQueryParamsMiddleware("mastermode"),
    validateQueryParamsMiddleware("dlc2"),
    getById(db, getArrow, "arrows")
  );

  router.get(
    "/shields/v1/:id",
    validateIdMiddleware,
    validateQueryParamsMiddleware("mastermode"),
    validateQueryParamsMiddleware("dlc2"),
    getById(db, getShield, "shields")
  );

  router.get(
    "/treasures/v1/:id",
    validateIdMiddleware,
    validateQueryParamsMiddleware("mastermode"),
    validateQueryParamsMiddleware("dlc2"),
    getById(db, getTreasure, "treasures")
  );

  // GET collections
  router.get(
    "/creatures/v1",
    validateQueryParamsMiddleware("creature_type"),
    getCollection(db, getCreaturesCollection)
  );

  router.get(
    "/monsters/v1",
    validateQueryParamsMiddleware("monster_type"),
    getCollection(db, getMonstersCollection)
  );

  router.get(
    "/materials/v1",
    validateQueryParamsMiddleware("material_type"),
    getCollection(db, getMaterialsCollection)
  );

  router.get(
    "/weapons/v1",
    validateQueryParamsMiddleware("weapon_type"),
    validateQueryParamsMiddleware("hands"),
    getCollection(db, getWeaponsCollection)
  );

  router.get("/bows/v1", getCollection(db, getBowsCollection));

  router.get("/arrows/v1", getCollection(db, getArrowsCollection));

  router.get("/shields/v1", getCollection(db, getShieldsCollection));

  router.get("/treasures/v1", getCollection(db, getTreasuresCollection));

  router.use(enrichResponseMiddleware);
  return router;
};

const getCollection = (db, queryFn) =>
  asyncMiddleware(async (req, res, next) => {
    // TODO: convert to reduce
    const filters = {};
    Object.keys(req.query).map(key => {
      filters[key] = req.query[key].split(",");
    });

    // Db Query
    const dbResponse = await queryFn(db, filters);
    res.body = { objects: dbResponse };
    next();
  });

const getById = (db, queryFn, resource) =>
  asyncMiddleware(async (req, res, next) => {
    // Path Params
    const id = req.params.id;

    //Querystring Params
    const isIdDlc2 = (req.query && req.query.dlc2) || false;
    const isIdMasterMode = (req.query && req.query.mastermode) || false;

    // Db Query
    const dbResponse = await queryFn(db, id, isIdDlc2, isIdMasterMode);
    if (dbResponse === null) {
      res.status(404).send({
        message: `compendium/${resource}/v1 resource with id ${id} does not exist.`,
      });
      return;
    }
    res.body = dbResponse;
    next();
  });

module.exports = routes;
