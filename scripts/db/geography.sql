-- GRANT ALL PRIVILEGES ON DATABASE botw TO admin;

DROP MATERIALIZED VIEW IF EXISTS location_views;
DROP TABLE IF EXISTS locations;
DROP TABLE IF EXISTS location_types;
DROP TABLE IF EXISTS subregions;
DROP TABLE IF EXISTS regions;

CREATE TABLE location_types
(
    id INT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL
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

-- Data structured for consumer
CREATE MATERIALIZED VIEW location_views
AS
SELECT
    R.id AS region_id,
    R.name AS region,
    S.id AS subregion_id,
    S.name AS subregion,
    L.id AS location_id,
    L.name AS location,
    T.id AS location_type_id,
    T.name AS location_type
    FROM locations L
    LEFT JOIN regions R ON R.id = L.region_fk 
    LEFT JOIN subregions S ON S.id = L.subregion_fk
    LEFT JOIN location_types T ON T.id = L.location_type_fk
ORDER BY L.id ASC
WITH DATA;
