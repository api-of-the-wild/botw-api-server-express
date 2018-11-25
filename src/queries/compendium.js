const _makeQueryField = (isIdDlc2, isIdMasterMode) =>
  isIdDlc2 && isIdMasterMode
    ? "compendium_id_master_mode_dlc_2"
    : isIdDlc2
      ? "compendium_id_dlc_2"
      : isIdMasterMode
        ? "compendium_id_master_mode"
        : "compendium_id";

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
  getArrow,
  getShield,
};
