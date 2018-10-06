-- GRANT ALL PRIVILEGES ON DATABASE botw TO admin;

DROP TABLE IF EXISTS locations;
DROP TABLE IF EXISTS location_types;
DROP TABLE IF EXISTS subregions;
DROP TABLE IF EXISTS regions;

CREATE TABLE location_types
(
    id INT PRIMARY KEY NOT NULL,
    location_type TEXT NOT NULL
);

CREATE TABLE regions
(
    id INT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL
);

CREATE TABLE subregions
(
    id INT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    region_fk INT references regions(id)
);

CREATE TABLE locations
(
    id INT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    region_fk INT references regions(id),
    subregion_fk INT references subregions(id),
    location_type_fk INT references location_types(id)
);

COPY location_types FROM '/Users/kwhitejr/Projects/botw-api-server-express/db/data/geography/locationType.csv' DELIMITER ',' CSV HEADER;
COPY regions FROM '/Users/kwhitejr/Projects/botw-api-server-express/db/data/geography/region.csv' DELIMITER ',' CSV HEADER;
COPY subregions FROM '/Users/kwhitejr/Projects/botw-api-server-express/db/data/geography/subregion.csv' DELIMITER ',' CSV HEADER;
COPY locations FROM '/Users/kwhitejr/Projects/botw-api-server-express/db/data/geography/location.csv' DELIMITER ',' CSV HEADER;