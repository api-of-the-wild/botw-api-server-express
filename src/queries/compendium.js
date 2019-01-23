const _makeQueryField = (isIdDlc2, isIdMasterMode) =>
  isIdDlc2 && isIdMasterMode
    ? "compendium_id_master_mode_dlc_2"
    : isIdDlc2
    ? "compendium_id_dlc_2"
    : isIdMasterMode
    ? "compendium_id_master_mode"
    : "compendium_id";

const getCreature = (db, id, isIdDlc2, isIdMasterMode) => {
  const idQueryField = _makeQueryField(isIdDlc2, isIdMasterMode);

  return db.creature_views
    .findOne(
      { [idQueryField]: id },
      {
        fields: [
          "compendium_id",
          "compendium_id_dlc_2",
          "compendium_id_master_mode",
          "compendium_id_master_mode_dlc_2",
          "name",
          "creature_type",
          "recoverable_materials",
          "description",
        ],
      }
    )
    .then(creature => {
      if (creature === undefined) {
        return null;
      } else {
        return creature;
      }
    });
};

const getCreaturesCollection = (db, filters) => {
  return db.creature_views
    .find(filters, {
      fields: [
        "compendium_id",
        "compendium_id_dlc_2",
        "compendium_id_master_mode",
        "compendium_id_master_mode_dlc_2",
        "name",
        "creature_type",
        "recoverable_materials",
        "description",
      ],
    })
    .then(creatures => {
      if (creatures === undefined) {
        return null;
      } else {
        return creatures;
      }
    });
};

const getMonster = (db, id, isIdDlc2, isIdMasterMode) => {
  const idQueryField = _makeQueryField(isIdDlc2, isIdMasterMode);

  return db.monster_views
    .findOne(
      { [idQueryField]: id },
      {
        fields: [
          "compendium_id",
          "compendium_id_dlc_2",
          "compendium_id_master_mode",
          "compendium_id_master_mode_dlc_2",
          "name",
          "monster_type",
          "health",
          "base_damage",
          "recoverable_materials",
          "description",
        ],
      }
    )
    .then(monster => {
      if (monster === undefined) {
        return null;
      } else {
        return monster;
      }
    });
};

const getMonstersCollection = (db, filters) => {
  return db.monster_views
    .find(filters, {
      fields: [
        "compendium_id",
        "compendium_id_dlc_2",
        "compendium_id_master_mode",
        "compendium_id_master_mode_dlc_2",
        "name",
        "monster_type",
        "health",
        "base_damage",
        "recoverable_materials",
        "description",
      ],
    })
    .then(monsters => {
      if (monsters === undefined) {
        return null;
      } else {
        return monsters;
      }
    });
};

const getMaterial = (db, id, isIdDlc2, isIdMasterMode) => {
  const idQueryField = _makeQueryField(isIdDlc2, isIdMasterMode);

  return db.material_views
    .findOne(
      { [idQueryField]: id },
      {
        fields: [
          "compendium_id",
          "compendium_id_dlc_2",
          "compendium_id_master_mode",
          "compendium_id_master_mode_dlc_2",
          "name",
          "material_type",
          "value",
          "restores",
          "description",
          "additional_uses",
        ],
      }
    )
    .then(material => {
      if (material === undefined) {
        return null;
      } else {
        return material;
      }
    });
};

const getMaterialsCollection = (db, filters) => {
  return db.material_views
    .find(filters, {
      fields: [
        "compendium_id",
        "compendium_id_dlc_2",
        "compendium_id_master_mode",
        "compendium_id_master_mode_dlc_2",
        "name",
        "material_type",
        "value",
        "restores",
        "description",
        "additional_uses",
      ],
    })
    .then(materials => {
      if (materials === undefined) {
        return null;
      } else {
        return materials;
      }
    });
};

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

const getTreasure = (db, id, isIdDlc2, isIdMasterMode) => {
  const idQueryField = _makeQueryField(isIdDlc2, isIdMasterMode);

  return db.treasure_views
    .findOne(
      { [idQueryField]: id },
      {
        fields: [
          "compendium_id",
          "compendium_id_dlc_2",
          "compendium_id_master_mode",
          "compendium_id_master_mode_dlc_2",
          "name",
          "recoverable_materials",
          "description",
        ],
      }
    )
    .then(treasure => {
      if (treasure === undefined) {
        return null;
      } else {
        return treasure;
      }
    });
};

const getTreasuresCollection = (db, filters) => {
  return db.treasure_views
    .find(filters, {
      fields: [
        "compendium_id",
        "compendium_id_dlc_2",
        "compendium_id_master_mode",
        "compendium_id_master_mode_dlc_2",
        "name",
        "recoverable_materials",
        "description",
      ],
    })
    .then(treasures => {
      if (treasures === undefined) {
        return null;
      } else {
        return treasures;
      }
    });
};

module.exports = {
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
  _makeQueryField,
};
