/* eslint-disable no-unused-vars*/
const router = require("express").Router();

const {
  asyncMiddleware,
  enrichResponseMiddleware,
} = require("../utilities/middleware");

const {
  getWeapon,
  getBow,
  getArrow,
  getShield,
  getWeaponsCollection,
} = require("../queries/compendium");

const { validateQueryParams } = require("../utilities/queryParamsValidation");

const routes = app => {
  const db = app.get("db");

  // router.get(
  //   "/materials/v1/:id",
  //   asyncMiddleware(async (req, res, next) => {
  //     const id = req.params.id;
  //     const location = await getLocation(db, id);
  //     if (location === null) {
  //       res.status(404).send({
  //         message: `Locations resource with id ${id} does not exist.`,
  //       });
  //       return;
  //     }
  //     res.body = location;
  //     next();
  //   })
  // );

  router.get(
    "/weapons/v1/:id",
    asyncMiddleware(async (req, res, next) => {
      // Path Params
      const id = req.params.id;

      //Querystring Params
      const isIdDlc2 = (req.query && req.query.dlc2) || false;
      const isIdMasterMode = (req.query && req.query.mastermode) || false;
      const weaponTypes =
        req.query && req.query.weapontypes
          ? req.query.weapontypes.split(",")
          : [];
      console.log(weaponTypes);

      // Db Query
      const weapon = await getWeapon(db, id, isIdDlc2, isIdMasterMode);
      if (weapon === null) {
        res.status(404).send({
          message: `compendium/weapons/v1 resource with id ${id} does not exist.`,
        });
        return;
      }
      res.body = weapon;
      next();
    })
  );

  router.get(
    "/weapons/v1",
    validateQueryParams("weapon_type"),
    validateQueryParams("hands"),
    asyncMiddleware(async (req, res, next) => {
      // TODO: convert to reduce
      const filters = {};
      Object.keys(req.query).map(key => {
        filters[key] = req.query[key].split(",");
      });

      // Db Query
      const weapons = await getWeaponsCollection(db, filters);
      res.body = { objects: weapons };
      next();
    }),
    enrichResponseMiddleware
  );

  router.get(
    "/bows/v1/:id",
    asyncMiddleware(async (req, res, next) => {
      const id = req.params.id;
      const isIdDlc2 = (req.query && req.query.dlc2) || false;
      const isIdMasterMode = (req.query && req.query.mastermode) || false;
      const bow = await getBow(db, id, isIdDlc2, isIdMasterMode);
      if (bow === null) {
        res.status(404).send({
          message: `compendium/bows/v1 resource with id ${id} does not exist.`,
        });
        return;
      }
      res.body = bow;
      next();
    })
  );

  router.get(
    "/arrows/v1/:id",
    asyncMiddleware(async (req, res, next) => {
      const id = req.params.id;
      const isIdDlc2 = (req.query && req.query.dlc2) || false;
      const isIdMasterMode = (req.query && req.query.mastermode) || false;
      const arrow = await getArrow(db, id, isIdDlc2, isIdMasterMode);
      if (arrow === null) {
        res.status(404).send({
          message: `compendium/arrows/v1 resource with id ${id} does not exist.`,
        });
        return;
      }
      res.body = arrow;
      next();
    })
  );

  router.get(
    "/shields/v1/:id",
    asyncMiddleware(async (req, res, next) => {
      const id = req.params.id;
      const isIdDlc2 = (req.query && req.query.dlc2) || false;
      const isIdMasterMode = (req.query && req.query.mastermode) || false;
      const shield = await getShield(db, id, isIdDlc2, isIdMasterMode);
      if (shield === null) {
        res.status(404).send({
          message: `compendium/shields/v1 resource with id ${id} does not exist.`,
        });
        return;
      }
      res.body = shield;
      next();
    })
  );

  // router.get(
  //   "/treasure/v1/:id",
  //   asyncMiddleware(async (req, res, next) => {
  //     const id = req.params.id;
  //     // const region = await getRegion(db, id);
  //     // if (region === null) {
  //     //   res.status(404).send({
  //     //     message: `Regions resource with id ${id} does not exist.`,
  //     //   });
  //     //   return;
  //     // }
  //     // res.body = region;
  //     next();
  //   })
  // );

  router.use(enrichResponseMiddleware);
  return router;
};

module.exports = routes;
