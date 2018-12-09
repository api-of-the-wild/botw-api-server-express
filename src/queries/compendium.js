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

const getBowsCollection = (db, filters) => {
  return db.bows
    .find(filters, {
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
    })
    .then(bows => {
      if (bows === undefined) {
        return null;
      } else {
        return bows;
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

const getArrowsCollection = (db, filters) => {
  return db.arrows
    .find(filters, {
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
    })
    .then(arrows => {
      if (arrows === undefined) {
        return null;
      } else {
        return arrows;
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

const getShieldsCollection = (db, filters) => {
  return db.shields
    .find(filters, {
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
    })
    .then(shields => {
      if (shields === undefined) {
        return null;
      } else {
        return shields;
      }
    });
};

module.exports = {
  getWeapon,
  getBow,
  getArrow,
  getShield,
  getWeaponsCollection,
  getBowsCollection,
  getArrowsCollection,
  getShieldsCollection,
};
