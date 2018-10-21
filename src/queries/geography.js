const getLocation = (db, id) => {
  return db.location_views
    .findOne(
      { location_id: id },
      {
        decompose: {
          pk: "location_id",
          columns: {
            location_id: "id",
            location: "name",
            location_type: "location_type",
          },
        },
      }
    )
    .then(location => location);
};

const getSubregion = (db, id) => {
  return db.location_views
    .find(
      { subregion_id: id },
      {
        decompose: {
          pk: "subregion_id",
          columns: {
            subregion_id: "id",
            subregion: "name",
            region: "region",
          },
          locations: {
            pk: "location_id",
            columns: {
              location_id: "id",
              location: "name",
              location_type: "location_type",
            },
            array: true,
          },
        },
      }
    )
    .then(region => region[0]);
};

const getRegion = (db, id) => {
  return db.location_views
    .find(
      { region_id: id },
      {
        decompose: {
          pk: "region_id",
          columns: {
            region_id: "id",
            region: "name",
          },
          subregions: {
            pk: "subregion_id",
            columns: {
              subregion_id: "id",
              subregion: "name",
            },
            locations: {
              pk: "location_id",
              columns: {
                location_id: "id",
                location: "name",
                location_type: "location_type",
              },
              array: true,
            },
            array: true,
          },
        },
      }
    )
    .then(region => region[0]);
};

module.exports = {
  getLocation,
  getSubregion,
  getRegion,
};
