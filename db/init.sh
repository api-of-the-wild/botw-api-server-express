#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" "$POSTGRES_DB" <<-EOSQL
    GRANT ALL PRIVILEGES ON DATABASE $POSTGRES_DB TO $POSTGRES_USER;

    CREATE TABLE location_types (
        id INT PRIMARY KEY,
        location_type TEXT NOT NULL
    );

    CREATE TABLE regions (
        id INT PRIMARY KEY,
        name TEXT NOT NULL
    );

    CREATE TABLE subregions (
        id INT PRIMARY KEY,
        name TEXT NOT NULL,
        region_fk INT references regions(id)
    );

    CREATE TABLE locations (
        id INT PRIMARY KEY,
        name TEXT NOT NULL,
        region_fk INT references regions(id),
        subregion_fk INT references subregions(id),
        location_type_fk INT references location_types(id)
    );

    COPY location_types FROM '/docker-entrypoint-initdb.d/data/locationType.csv' DELIMITER ',' CSV HEADER;
    COPY regions FROM '/docker-entrypoint-initdb.d/data/region.csv' DELIMITER ',' CSV HEADER;
    COPY subregions FROM '/docker-entrypoint-initdb.d/data/subregion.csv' DELIMITER ',' CSV HEADER;
    COPY locations FROM '/docker-entrypoint-initdb.d/data/location.csv' DELIMITER ',' CSV HEADER;
EOSQL