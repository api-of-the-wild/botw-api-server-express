const _makeQueryField = (isIdDlc2, isIdMasterMode) =>
  isIdDlc2 && isIdMasterMode
    ? "compendium_id_master_mode_dlc_2"
    : isIdDlc2
      ? "compendium_id_dlc_2"
      : isIdMasterMode
        ? "compendium_id_master_mode"
        : "compendium_id";

const getWeapon = (db, id, isIdDlc2, isIdMasterMode) => {
  const idQueryField = _makeQueryField(isIdDlc2, isIdMasterMode);

  return db.weapons
    .findOne(
      { [idQueryField]: id },
      {
        fields: [
          "compendium_id",
          "compendium_id_dlc_2",
          "compendium_id_master_mode",
          "compendium_id_master_mode_dlc_2",
          "name",
          "hands",
          "weapon_type",
          "attack_power",
          "durability",
          "description",
        ],
      }
    )
    .then(weapon => {
      if (weapon === undefined) {
        return null;
      } else {
        return weapon;
      }
    });
};

const getWeaponsCollection = (db, filters) => {
  return db.weapons
    .find(filters, {
      fields: [
        "compendium_id",
        "compendium_id_dlc_2",
        "compendium_id_master_mode",
        "compendium_id_master_mode_dlc_2",
        "name",
        "hands",
        "weapon_type",
        "attack_power",
        "durability",
        "description",
      ],
    })
    .then(weapons => {
      if (weapons === undefined) {
        return null;
      } else {
        return weapons;
      }
    });
};

const getBow = (db, id, isIdDlc2, isIdMasterMode) => {
  const idQueryField = _makeQueryField(isIdDlc2, isIdMasterMode);

  return db.bows
    .findOne(
      { [idQueryField]: id },
      {
        fields: [
          "compendium_id",
          "compendium_id_dlc_2",
          "compendium_id_master_mode",
          "compendium_id_master_mode_dlc_2",
          "name",
          "attack_power",
          "durability",
          "range",
          "fire_rate",
          "description",
        ],
      }
    )
    .then(bow => {
      if (bow === undefined) {
        return null;
      } else {
        return bow;
      }
    });
};

const getArrow = (db, id, isIdDlc2, isIdMasterMode) => {
  const idQueryField = _makeQueryField(isIdDlc2, isIdMasterMode);

  return db.arrows
    .findOne(
      { [idQueryField]: id },
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

const getShield = (db, id, isIdDlc2, isIdMasterMode) => {
  const idQueryField = _makeQueryField(isIdDlc2, isIdMasterMode);

  return db.shields
    .findOne(
      { [idQueryField]: id },
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
  getWeapon,
  getBow,
  getArrow,
  getShield,
  getWeaponsCollection,
};
