const WEAPON_TYPE_ENUM = [
  "arm",
  "axe",
  "bat",
  "boomerang",
  "carver",
  "club",
  "crusher",
  "hammer",
  "leaf",
  "polearm",
  "rod",
  "sickle",
  "spear",
  "sword",
];
const WEAPON_HANDS_ENUM = ["1", "2"];

const VALID_QUERY_PARAMS = {
  weapon_type: WEAPON_TYPE_ENUM,
  hands: WEAPON_HANDS_ENUM,
};

const validateQueryParams = queryParam => (req, res, next) => {
  const queryParamsArray =
    req.query && req.query[queryParam]
      ? req.query[queryParam].split(",")
      : null;
  console.log(`queryParamsArray for ${queryParam} is ${queryParamsArray}`);

  if (queryParamsArray === null) {
    return next();
  }

  const queryParamValuesAreValid = queryParamsArray.every(val =>
    VALID_QUERY_PARAMS[queryParam].includes(val)
  );
  console.log(`queryParamValuesAreValid: ${queryParamValuesAreValid}`);

  if (!queryParamValuesAreValid) {
    res.status(400).send({
      message: `Query parameter ${queryParam} contains one or more invalid values: ${queryParamsArray}`,
    });
    return;
  }

  next();
};

module.exports = {
  validateQueryParams,
};
