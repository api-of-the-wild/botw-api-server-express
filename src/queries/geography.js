// .find() returns an array
// .findOne() returns an object or undefined

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
            region: "region",
            subregion: "subregion",
          },
        },
      }
    )
    .then(location => {
      if (location === undefined) {
        return null;
      } else {
        return location;
      }
    });
};

const getLocationsCollection = (db, filters) => {
  return db.location_views
    .find(filters, {
      decompose: {
        pk: "location_id",
        columns: {
          location_id: "id",
          location: "name",
          location_type: "location_type",
          region: "region",
          subregion: "subregion",
        },
      },
    })
    .then(locations => {
      if (locations === undefined) {
        return null;
      } else {
        return locations;
      }
    });
};

const getSubregion = (db, id) => {
  return db.location_views
    .findOne(
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
    .then(subregion => {
      if (subregion === undefined) {
        return null;
      } else {
        return subregion;
      }
    });
};

const getSubregionsCollection = (db, filters) => {
  return db.location_views
    .find(filters, {
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
    })
    .then(subregions => {
      if (subregions === undefined) {
        return null;
      } else {
        return subregions;
      }
    });
};

const getRegion = (db, id) => {
  return db.location_views
    .findOne(
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
    .then(region => {
      if (region === undefined) {
        return null;
      } else {
        return region;
      }
    });
};

const getRegionsCollection = (db, filters) => {
  return db.location_views
    .find(filters, {
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
    })
    .then(regions => {
      if (regions === undefined) {
        return null;
      } else {
        return regions;
      }
    });
};

module.exports = {
  getLocation,
  getSubregion,
  getRegion,
  getLocationsCollection,
  getSubregionsCollection,
  getRegionsCollection,
};
