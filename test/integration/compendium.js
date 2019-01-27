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
    describe("GET /creatures/v1", () => {
      it("should respond with a single creature resource by id", () => {
        const compendiumId = 1;
        const testUri = `${SERVER_URI_BASE}/compendium/creatures/v1/${compendiumId}`;
        const rpOptions = createRpOptions(testUri);
        return rp(rpOptions)
          .then(result => {
            // creature properties
            expect(result.compendium_id).to.be.a("number");
            expect(result.compendium_id_dlc_2).to.be.a("number");
            expect(result.compendium_id_master_mode).to.be.a("number");
            expect(result.compendium_id_master_mode_dlc_2).to.be.a("number");
            expect(result.name).to.be.a("string");
            expect(result.creature_type).to.be.a("string");
            expect(result.recoverable_materials).to.be.a("array");
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

      it("should respond with a creatures collection", () => {
        const testUri = `${SERVER_URI_BASE}/compendium/creatures/v1`;
        const rpOptions = createRpOptions(testUri);
        return rp(rpOptions)
          .then(result => {
            expect(result.objects).to.be.a("array");
            // Location properties
            result.objects.forEach(creature => {
              expect(creature.compendium_id).to.be.a("number");
              expect(creature.compendium_id_dlc_2).to.be.a("number");
              expect(creature.compendium_id_master_mode).to.be.a("number");
              expect(creature.compendium_id_master_mode_dlc_2).to.be.a(
                "number"
              );
              expect(creature.name).to.be.a("string");
              expect(creature.creature_type).to.be.a("string");
              expect(creature.recoverable_materials).to.be.a("array");
              expect(creature.description).to.be.a("string");
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

      it("should respond with a creatures collection constrained by creature_type filter", () => {
        const filter = "bird";
        const testUri = `${SERVER_URI_BASE}/compendium/creatures/v1?creature_type=${filter}`;
        const rpOptions = createRpOptions(testUri);
        return rp(rpOptions)
          .then(result => {
            expect(result.objects).to.be.a("array");
            // Location properties
            result.objects.forEach(creature => {
              expect(creature.compendium_id).to.be.a("number");
              expect(creature.compendium_id_dlc_2).to.be.a("number");
              expect(creature.compendium_id_master_mode).to.be.a("number");
              expect(creature.compendium_id_master_mode_dlc_2).to.be.a(
                "number"
              );
              expect(creature.name).to.be.a("string");
              expect(creature.creature_type).to.equal(filter);
              expect(creature.recoverable_materials).to.be.a("array");
              expect(creature.description).to.be.a("string");
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

    describe("GET /monsters/v1", () => {
      it("should respond with a single monster resource by id", () => {
        const compendiumId = 84;
        const testUri = `${SERVER_URI_BASE}/compendium/monsters/v1/${compendiumId}`;
        const rpOptions = createRpOptions(testUri);
        return rp(rpOptions)
          .then(result => {
            // monster properties
            expect(result.compendium_id).to.be.a("number");
            expect(result.compendium_id_dlc_2).to.be.a("number");
            expect(result.compendium_id_master_mode).to.be.a("number");
            expect(result.compendium_id_master_mode_dlc_2).to.be.a("number");
            expect(result.name).to.be.a("string");
            expect(result.monster_type).to.be.a("string");
            expect(result.health).to.be.a("number");
            expect(result.base_damage).to.be.a("number");
            expect(result.recoverable_materials).to.be.a("array");
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

      it("should respond with a monsters collection", () => {
        const testUri = `${SERVER_URI_BASE}/compendium/monsters/v1`;
        const rpOptions = createRpOptions(testUri);
        return rp(rpOptions)
          .then(result => {
            expect(result.objects).to.be.a("array");
            // Location properties
            result.objects.forEach(monster => {
              expect(monster.compendium_id).to.satisfy(
                value => value === null || typeof value === "number"
              );
              expect(monster.compendium_id_dlc_2).to.satisfy(
                value => value === null || typeof value === "number"
              );
              expect(monster.compendium_id_master_mode).to.satisfy(
                value => value === null || typeof value === "number"
              );
              expect(monster.compendium_id_master_mode_dlc_2).to.be.a("number");
              expect(monster.name).to.be.a("string");
              expect(monster.monster_type).to.be.a("string");
              expect(monster.health).to.satisfy(
                value => value === null || typeof value === "number"
              );
              expect(monster.base_damage).to.satisfy(
                value => value === null || typeof value === "number"
              );
              expect(monster.recoverable_materials).to.be.a("array");
              expect(monster.description).to.be.a("string");
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

      it("should respond with a monsters collection constrained by monster_type filter", () => {
        const filter = "bokoblin";
        const testUri = `${SERVER_URI_BASE}/compendium/monsters/v1?monster_type=${filter}`;
        const rpOptions = createRpOptions(testUri);
        return rp(rpOptions)
          .then(result => {
            expect(result.objects).to.be.a("array");
            // Location properties
            result.objects.forEach(monster => {
              expect(monster.compendium_id).to.satisfy(
                value => value === null || typeof value === "number"
              );
              expect(monster.compendium_id_dlc_2).to.satisfy(
                value => value === null || typeof value === "number"
              );
              expect(monster.compendium_id_master_mode).to.satisfy(
                value => value === null || typeof value === "number"
              );
              expect(monster.compendium_id_master_mode_dlc_2).to.be.a("number");
              expect(monster.name).to.be.a("string");
              expect(monster.monster_type).to.equal(filter);
              expect(monster.health).to.satisfy(
                value => value === null || typeof value === "number"
              );
              expect(monster.base_damage).to.satisfy(
                value => value === null || typeof value === "number"
              );
              expect(monster.recoverable_materials).to.be.a("array");
              expect(monster.description).to.be.a("string");
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

    describe("GET /materials/v1", () => {
      it("should respond with a single material resource by id", () => {
        const compendiumId = 162;
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

    describe("GET /arrows/v1", () => {
      it("should respond with a single arrow resource by id", () => {
        const compendiumId = 344;
        const testUri = `${SERVER_URI_BASE}/compendium/arrows/v1/${compendiumId}`;
        const rpOptions = createRpOptions(testUri);
        return rp(rpOptions)
          .then(result => {
            // bow properties
            expect(result.compendium_id).to.be.a("number");
            expect(result.compendium_id_dlc_2).to.be.a("number");
            expect(result.compendium_id_master_mode).to.be.a("number");
            expect(result.compendium_id_master_mode_dlc_2).to.be.a("number");
            expect(result.name).to.be.a("string");
            expect(result.attack_power_min).to.be.a("number");
            expect(result.attack_power_max).to.be.a("number");
            expect(result.effects).to.be.a("string");
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

      it("should respond with a arrows collection", () => {
        const testUri = `${SERVER_URI_BASE}/compendium/arrows/v1`;
        const rpOptions = createRpOptions(testUri);
        return rp(rpOptions)
          .then(result => {
            expect(result.objects).to.be.a("array");
            // arrows properties
            result.objects.forEach(arrow => {
              expect(arrow.compendium_id).to.satisfy(
                value => value === null || typeof value === "number"
              );
              expect(arrow.compendium_id_dlc_2).to.satisfy(
                value => value === null || typeof value === "number"
              );
              expect(arrow.compendium_id_master_mode).to.satisfy(
                value => value === null || typeof value === "number"
              );
              expect(arrow.compendium_id_master_mode_dlc_2).to.satisfy(
                value => value === null || typeof value === "number"
              );
              expect(arrow.name).to.be.a("string");
              expect(arrow.attack_power_min).to.be.a("number");
              expect(arrow.attack_power_max).to.be.a("number");
              expect(arrow.effects).to.be.a("string");
              expect(arrow.description).to.be.a("string");
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

    describe("GET /shields/v1", () => {
      it("should respond with a single shield resource by id", () => {
        const compendiumId = 350;
        const testUri = `${SERVER_URI_BASE}/compendium/shields/v1/${compendiumId}`;
        const rpOptions = createRpOptions(testUri);
        return rp(rpOptions)
          .then(result => {
            // Shield properties
            expect(result.compendium_id).to.be.a("number");
            expect(result.compendium_id_dlc_2).to.be.a("number");
            expect(result.compendium_id_master_mode).to.be.a("number");
            expect(result.compendium_id_master_mode_dlc_2).to.be.a("number");
            expect(result.name).to.be.a("string");
            expect(result.strength).to.be.a("number");
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

      it("should respond with a shields collection", () => {
        const testUri = `${SERVER_URI_BASE}/compendium/shields/v1`;
        const rpOptions = createRpOptions(testUri);
        return rp(rpOptions)
          .then(result => {
            expect(result.objects).to.be.a("array");
            // shields properties
            result.objects.forEach(shield => {
              expect(shield.compendium_id).to.satisfy(
                value => value === null || typeof value === "number"
              );
              expect(shield.compendium_id_dlc_2).to.satisfy(
                value => value === null || typeof value === "number"
              );
              expect(shield.compendium_id_master_mode).to.satisfy(
                value => value === null || typeof value === "number"
              );
              expect(shield.compendium_id_master_mode_dlc_2).to.satisfy(
                value => value === null || typeof value === "number"
              );
              expect(shield.name).to.be.a("string");
              expect(shield.strength).to.be.a("number");
              expect(shield.durability).to.be.a("number");
              expect(shield.description).to.be.a("string");
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

    describe("GET /treasures/v1", () => {
      it("should respond with a single treasure resource by id", () => {
        const compendiumId = 382;
        const testUri = `${SERVER_URI_BASE}/compendium/treasures/v1/${compendiumId}`;
        const rpOptions = createRpOptions(testUri);
        return rp(rpOptions)
          .then(result => {
            // Treasure properties
            expect(result.compendium_id).to.be.a("number");
            expect(result.compendium_id_dlc_2).to.be.a("number");
            expect(result.compendium_id_master_mode).to.be.a("number");
            expect(result.compendium_id_master_mode_dlc_2).to.be.a("number");
            expect(result.name).to.be.a("string");
            expect(result.recoverable_materials).to.be.a("array");
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

      it("should respond with a treasures collection", () => {
        const testUri = `${SERVER_URI_BASE}/compendium/treasures/v1`;
        const rpOptions = createRpOptions(testUri);
        return rp(rpOptions)
          .then(result => {
            expect(result.objects).to.be.a("array");
            // Location properties
            result.objects.forEach(treasure => {
              expect(treasure.compendium_id).to.be.a("number");
              expect(treasure.compendium_id_dlc_2).to.be.a("number");
              expect(treasure.compendium_id_master_mode).to.be.a("number");
              expect(treasure.compendium_id_master_mode_dlc_2).to.be.a(
                "number"
              );
              expect(treasure.name).to.be.a("string");
              expect(treasure.recoverable_materials).to.be.a("array");
              expect(treasure.description).to.be.a("string");
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

  describe("4xx cases", () => {
    it("should respond 400 when path or id is bogus", () => {
      const testCases = [
        `${SERVER_URI_BASE}/bogus/creatures/v1/3`,
        `${SERVER_URI_BASE}/compendium/bogus/v1/3`,
        `${SERVER_URI_BASE}/compendium/creatures/bogus/3`,
        `${SERVER_URI_BASE}/compendium/creatures/v1/bogus`,
        `${SERVER_URI_BASE}/hocus/bogus`,
      ];

      const testRunner = testCase => {
        const rpOptions = createRpOptions(testCase);

        return rp(rpOptions)
          .then(erroneousResult => {
            assert.fail(`Unexpected error was caught: ${erroneousResult}`);
          })
          .catch(result => {
            expect(result.statusCode).to.be.equal(400);
            expect(result.error.message).to.be.a("string");
          });
      };

      testCases.forEach(testRunner);
    });

    it("should respond 404 when resource for id is not found", () => {
      const testCases = [
        `${SERVER_URI_BASE}/compendium/creatures/v1/500`,
        `${SERVER_URI_BASE}/compendium/monsters/v1/500`,
        `${SERVER_URI_BASE}/compendium/materials/v1/500`,
        `${SERVER_URI_BASE}/compendium/weapons/v1/500`,
        `${SERVER_URI_BASE}/compendium/bows/v1/500`,
        `${SERVER_URI_BASE}/compendium/arrows/v1/500`,
        `${SERVER_URI_BASE}/compendium/treasures/v1/500`,
      ];

      const testRunner = testCase => {
        const rpOptions = createRpOptions(testCase);

        return rp(rpOptions)
          .then(erroneousResult => {
            assert.fail(`Unexpected resolution: ${erroneousResult}`);
          })
          .catch(result => {
            console.log(result); // eslint-disable-line
            expect(result.statusCode).to.be.equal(404);
            expect(result.error.message).to.be.a("string");
          });
      };

      testCases.forEach(testRunner);
    });
  });
});
