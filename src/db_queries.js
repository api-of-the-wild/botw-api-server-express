// const getRegion = (db) => {

// }

const countRegions = db => {
  return db.regions.count().then(total => {
    return total;
  });
};

module.exports = {
  countRegions,
};
