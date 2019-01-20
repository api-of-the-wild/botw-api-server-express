const { expect, assert } = require("chai");
const rp = require("request-promise");

const config = require("../../config.env");

const env = process.env;
const INTEGRATION_STAGE = env.INTEGRATION_STAGE || "ALPHA";
const SERVER_URI_BASE =
  env.SERVER_URI_BASE || config.app[INTEGRATION_STAGE].host;

const createRpOptions = uri => ({
  uri,
  headers: {
    "User-Agent": "Request-Promise",
  },
  json: true,
});

describe("the /compendium domain", () => {
  describe("200 happy paths", () => {
    describe("GET /materials/v1", () => {
      it("should respond with a single material resource by id", () => {
        const compendiumId = 48;
        const testUri = `${SERVER_URI_BASE}/compendium/materials/v1/${compendiumId}`;
        const rpOptions = createRpOptions(testUri);
        return rp(rpOptions)
          .then(result => {
            // Material properties
            expect(result.compendium_id).to.be.a("number");
            expect(result.compendium_id_dlc_2).to.be.a("number");
            expect(result.compendium_id_master_mode).to.be.a("number");
            expect(result.compendium_id_master_mode_dlc_2).to.be.a("number");
            expect(result.name).to.be.a("string");
            expect(result.material_type).to.be.a("string");
            expect(result.value).to.be.a("number");
            expect(result.restores).to.satisfy(
              value => value === null || typeof value === "string"
            );
            expect(result.additional_uses).to.be.a("array");
            expect(result.description).to.be.a("string");
            // Request metadata properties
            expect(result.self).to.be.a("string");
            expect(result.resource).to.be.a("string");
            expect(result.version).to.be.a("string");
          })
          .catch(err => {
            assert.fail(`Unexpected error was caught: ${err}`);
          });
      });

      it("should respond with a materials collection", () => {
        const testUri = `${SERVER_URI_BASE}/compendium/materials/v1`;
        const rpOptions = createRpOptions(testUri);
        return rp(rpOptions)
          .then(result => {
            expect(result.objects).to.be.a("array");
            // Location properties
            result.objects.forEach(material => {
              expect(material.compendium_id).to.be.a("number");
              expect(material.compendium_id_dlc_2).to.be.a("number");
              expect(material.compendium_id_master_mode).to.be.a("number");
              expect(material.compendium_id_master_mode_dlc_2).to.be.a(
                "number"
              );
              expect(material.name).to.be.a("string");
              expect(material.material_type).to.be.a("string");
              expect(material.value).to.be.a("number");
              expect(material.restores).to.satisfy(
                value => value === null || typeof value === "string"
              );
              expect(material.additional_uses).to.be.a("array");
              expect(material.description).to.be.a("string");
            });
            // Request metadata properties
            expect(result.self).to.be.a("string");
            expect(result.resource).to.be.a("string");
            expect(result.version).to.be.a("string");
          })
          .catch(err => {
            assert.fail(`Unexpected error was caught: ${err}`);
          });
      });

      it("should respond with a materials collection constrained by material_type filter", () => {
        const filter = "Food";
        const testUri = `${SERVER_URI_BASE}/compendium/materials/v1?material_type=${filter}`;
        const rpOptions = createRpOptions(testUri);
        return rp(rpOptions)
          .then(result => {
            expect(result.objects).to.be.a("array");
            // Location properties
            result.objects.forEach(material => {
              expect(material.compendium_id).to.be.a("number");
              expect(material.compendium_id_dlc_2).to.be.a("number");
              expect(material.compendium_id_master_mode).to.be.a("number");
              expect(material.compendium_id_master_mode_dlc_2).to.be.a(
                "number"
              );
              expect(material.name).to.be.a("string");
              expect(material.material_type).to.equal(filter);
              expect(material.value).to.be.a("number");
              expect(material.restores).to.satisfy(
                value => value === null || typeof value === "string"
              );
              expect(material.additional_uses).to.be.a("array");
              expect(material.description).to.be.a("string");
            });
            // Request metadata properties
            expect(result.self).to.be.a("string");
            expect(result.resource).to.be.a("string");
            expect(result.version).to.be.a("string");
          })
          .catch(err => {
            assert.fail(`Unexpected error was caught: ${err}`);
          });
      });
    });

    describe("GET /weapons/v1", () => {
      it("should respond with a single weapon resource by id", () => {
        const compendiumId = 230;
        const testUri = `${SERVER_URI_BASE}/compendium/weapons/v1/${compendiumId}`;
        const rpOptions = createRpOptions(testUri);
        return rp(rpOptions)
          .then(result => {
            // weapon properties
            expect(result.compendium_id).to.be.a("number");
            expect(result.compendium_id_dlc_2).to.be.a("number");
            expect(result.compendium_id_master_mode).to.be.a("number");
            expect(result.compendium_id_master_mode_dlc_2).to.be.a("number");
            expect(result.name).to.be.a("string");
            expect(result.hands).to.be.a("number");
            expect(result.weapon_type).to.be.a("string");
            expect(result.attack_power).to.be.a("number");
            expect(result.durability).to.be.a("number");
            expect(result.description).to.be.a("string");
            // Request metadata properties
            expect(result.self).to.be.a("string");
            expect(result.resource).to.be.a("string");
            expect(result.version).to.be.a("string");
          })
          .catch(err => {
            assert.fail(`Unexpected error was caught: ${err}`);
          });
      });

      it("should respond with a weapons collection", () => {
        const testUri = `${SERVER_URI_BASE}/compendium/weapons/v1`;
        const rpOptions = createRpOptions(testUri);
        return rp(rpOptions)
          .then(result => {
            expect(result.objects).to.be.a("array");
            // Weapons properties
            result.objects.forEach(weapon => {
              expect(weapon.compendium_id).to.satisfy(
                value => value === null || typeof value === "number"
              );
              expect(weapon.compendium_id_dlc_2).to.satisfy(
                value => value === null || typeof value === "number"
              );
              expect(weapon.compendium_id_master_mode).to.satisfy(
                value => value === null || typeof value === "number"
              );
              expect(weapon.compendium_id_master_mode_dlc_2).to.satisfy(
                value => value === null || typeof value === "number"
              );
              expect(weapon.name).to.be.a("string");
              expect(weapon.hands).to.be.a("number");
              expect(weapon.weapon_type).to.be.a("string");
              expect(weapon.attack_power).to.satisfy(
                value => value === null || typeof value === "number"
              );
              expect(weapon.durability).to.satisfy(
                value => value === null || typeof value === "number"
              );
              expect(weapon.description).to.be.a("string");
            });
            // Request metadata properties
            expect(result.self).to.be.a("string");
            expect(result.resource).to.be.a("string");
            expect(result.version).to.be.a("string");
          })
          .catch(err => {
            assert.fail(`Unexpected error was caught: ${err}`);
          });
      });

      it("should respond with a weapons collection constrained by weapon_type filter", () => {
        const filter = "spear";
        const testUri = `${SERVER_URI_BASE}/compendium/weapons/v1?weapon_type=${filter}`;
        const rpOptions = createRpOptions(testUri);
        return rp(rpOptions)
          .then(result => {
            expect(result.objects).to.be.a("array");
            // Location properties
            result.objects.forEach(weapon => {
              expect(weapon.compendium_id).to.be.a("number");
              expect(weapon.compendium_id_dlc_2).to.be.a("number");
              expect(weapon.compendium_id_master_mode).to.be.a("number");
              expect(weapon.compendium_id_master_mode_dlc_2).to.be.a("number");
              expect(weapon.name).to.be.a("string");
              expect(weapon.hands).to.be.a("number");
              expect(weapon.weapon_type).to.equal(filter);
              expect(weapon.attack_power).to.be.a("number");
              expect(weapon.durability).to.be.a("number");
              expect(weapon.description).to.be.a("string");
            });
            // Request metadata properties
            expect(result.self).to.be.a("string");
            expect(result.resource).to.be.a("string");
            expect(result.version).to.be.a("string");
          })
          .catch(err => {
            assert.fail(`Unexpected error was caught: ${err}`);
          });
      });
    });

    describe("GET /bows/v1", () => {
      it("should respond with a single bow resource by id", () => {
        const compendiumId = 332;
        const testUri = `${SERVER_URI_BASE}/compendium/bows/v1/${compendiumId}`;
        const rpOptions = createRpOptions(testUri);
        return rp(rpOptions)
          .then(result => {
            // bow properties
            expect(result.compendium_id).to.be.a("number");
            expect(result.compendium_id_dlc_2).to.be.a("number");
            expect(result.compendium_id_master_mode).to.be.a("number");
            expect(result.compendium_id_master_mode_dlc_2).to.be.a("number");
            expect(result.name).to.be.a("string");
            expect(result.range).to.be.a("number");
            expect(result.fire_rate).to.be.a("number");
            expect(result.attack_power).to.be.a("number");
            expect(result.durability).to.be.a("number");
            expect(result.description).to.be.a("string");
            // Request metadata properties
            expect(result.self).to.be.a("string");
            expect(result.resource).to.be.a("string");
            expect(result.version).to.be.a("string");
          })
          .catch(err => {
            assert.fail(`Unexpected error was caught: ${err}`);
          });
      });

      it("should respond with a bows collection", () => {
        const testUri = `${SERVER_URI_BASE}/compendium/bows/v1`;
        const rpOptions = createRpOptions(testUri);
        return rp(rpOptions)
          .then(result => {
            expect(result.objects).to.be.a("array");
            // bows properties
            result.objects.forEach(bow => {
              expect(bow.compendium_id).to.satisfy(
                value => value === null || typeof value === "number"
              );
              expect(bow.compendium_id_dlc_2).to.satisfy(
                value => value === null || typeof value === "number"
              );
              expect(bow.compendium_id_master_mode).to.satisfy(
                value => value === null || typeof value === "number"
              );
              expect(bow.compendium_id_master_mode_dlc_2).to.satisfy(
                value => value === null || typeof value === "number"
              );
              expect(bow.name).to.be.a("string");
              expect(bow.range).to.be.a("number");
              expect(bow.fire_rate).to.be.a("number");
              expect(bow.attack_power).to.be.a("number");
              expect(bow.durability).to.be.a("number");
              expect(bow.description).to.be.a("string");
            });
            // Request metadata properties
            expect(result.self).to.be.a("string");
            expect(result.resource).to.be.a("string");
            expect(result.version).to.be.a("string");
          })
          .catch(err => {
            assert.fail(`Unexpected error was caught: ${err}`);
          });
      });
    });
  });

  // describe("4xx cases", () => {
  //   it("should respond 400 when path or id is bogus", () => {
  //     const testCases = [
  //       `${SERVER_URI_BASE}/bogus/regions/v1/3`,
  //       `${SERVER_URI_BASE}/compendium/bogus/v1/3`,
  //       `${SERVER_URI_BASE}/compendium/regions/bogus/3`,
  //       `${SERVER_URI_BASE}/compendium/regions/v1/bogus`,
  //       `${SERVER_URI_BASE}/hocus/bogus`,
  //     ];

  //     const testRunner = testCase => {
  //       const rpOptions = createRpOptions(testCase);

  //       return rp(rpOptions)
  //         .then(erroneousResult => {
  //           logger.error(`Unexpected error was caught: ${erroneousResult}`);
  //         })
  //         .catch(result => {
  //           expect(result.statusCode).to.be.equal(400);
  //           expect(result.error.message).to.be.a("string");
  //         });
  //     };

  //     testCases.forEach(testRunner);
  //   });

  //   it("should respond 404 when resource for id is not found", () => {
  //     const testCases = [
  //       `${SERVER_URI_BASE}/compendium/regions/v1/30`,
  //       `${SERVER_URI_BASE}/compendium/subregions/v1/1000`,
  //       `${SERVER_URI_BASE}/compendium/locations/v1/3000`,
  //     ];

  //     const testRunner = testCase => {
  //       const rpOptions = createRpOptions(testCase);

  //       return rp(rpOptions)
  //         .then(erroneousResult => {
  //           logger.error(`Unexpected resolution: ${erroneousResult}`);
  //         })
  //         .catch(result => {
  //           expect(result.statusCode).to.be.equal(404);
  //           expect(result.error.message).to.be.a("string");
  //         });
  //     };

  //     testCases.forEach(testRunner);
  //   });
  // });
});
