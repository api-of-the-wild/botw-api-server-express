/* eslint-disable no-unused-vars*/
const router = require("express").Router();

const {
  asyncMiddleware,
  enrichResponseMiddleware,
} = require("../utilities/middleware");

const {
  // getWeapon,
  // getBow,
  getArrow,
  getShield,
} = require("../queries/compendium");

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

  // router.get(
  //   "/weapons/v1/:id",
  //   asyncMiddleware(async (req, res, next) => {
  //     const id = req.params.id;
  //     const subregion = await getSubregion(db, id);
  //     if (subregion === null) {
  //       res.status(404).send({
  //         message: `Subregions resource with id ${id} does not exist.`,
  //       });
  //       return;
  //     }
  //     res.body = subregion;
  //     next();
  //   })
  // );

  // router.get(
  //   "/bows/v1/:id",
  //   asyncMiddleware(async (req, res, next) => {
  //     const id = req.params.id;
  //     const region = await getRegion(db, id);
  //     if (region === null) {
  //       res.status(404).send({
  //         message: `Regions resource with id ${id} does not exist.`,
  //       });
  //       return;
  //     }
  //     res.body = region;
  //     next();
  //   })
  // );

  router.get(
    "/arrows/v1/:id",
    asyncMiddleware(async (req, res, next) => {
      const id = req.params.id;
      const arrow = await getArrow(db, id);
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
      const shield = await getShield(db, id);
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
