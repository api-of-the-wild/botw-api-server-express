#!/usr/bin/env bash

CURRENT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd -P )"
CURRENT_DIR="${CURRENT_DIR:?}"
SCRIPTS_DIR="$(realpath "${CURRENT_DIR}/..")"
ROOT_DIR="$(realpath "${SCRIPTS_DIR}/..")"

psql \
  --host=ad1375259bnjkgw.cthhrssqz0g0.us-west-2.rds.amazonaws.com \
  --port=5432 \
  --username=kwhitejr \
  --password \
  --dbname=botw \
  <<-EOSQL
    GRANT ALL PRIVILEGES ON DATABASE botw TO kwhitejr;

    -- Init geography domain
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

    \copy location_types FROM '$PWD/db/data/geography/locationType.csv' DELIMITER ',' CSV HEADER;
    \copy regions FROM '$PWD/db/data/geography/region.csv' DELIMITER ',' CSV HEADER;
    \copy subregions FROM '$PWD/db/data/geography/subregion.csv' DELIMITER ',' CSV HEADER;
    \copy locations FROM '$PWD/db/data/geography/location.csv' DELIMITER ',' CSV HEADER;

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
EOSQL