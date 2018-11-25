const getArrow = (db, id) => {
  return db.arrows
    .findOne(
      { compendium_id: id },
      {
        fields: [
          "compendium_id",
          "compendium_id_dlc_2",
          "compendium_id_master_mode",
          "compendium_id_master_mode_dlc_2",
          "name",
          "attack_power_min",
          "attack_power_max",
          "effects",
          "description",
        ],
      }
    )
    .then(arrow => {
      if (arrow === undefined) {
        return null;
      } else {
        return arrow;
      }
    });
};

const getShield = (db, id) => {
  return db.shields
    .findOne(
      { compendium_id: id },
      {
        fields: [
          "compendium_id",
          "compendium_id_dlc_2",
          "compendium_id_master_mode",
          "compendium_id_master_mode_dlc_2",
          "name",
          "strength",
          "durability",
          "description",
        ],
      }
    )
    .then(shield => {
      if (shield === undefined) {
        return null;
      } else {
        return shield;
      }
    });
};

module.exports = {
  getArrow,
  getShield,
};
