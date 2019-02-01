#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" "$POSTGRES_DB" <<-EOSQL
    GRANT ALL PRIVILEGES ON DATABASE $POSTGRES_DB TO $POSTGRES_USER;

    -- Init /crafting domain
    DROP MATERIALIZED VIEW IF EXISTS creature_views;
    DROP MATERIALIZED VIEW IF EXISTS monster_views;
    DROP MATERIALIZED VIEW IF EXISTS treasure_views;

    DROP TABLE IF EXISTS recoverable_materials;

    CREATE TABLE recoverable_materials
    (
        id INT PRIMARY KEY NOT NULL,
        compendium_id INT NULL,
        compendium_id_dlc_2 INT NULL,
        compendium_id_master_mode INT NULL,
        compendium_id_master_mode_dlc_2 INT NULL,
        name TEXT NOT NULL,
        material_type TEXT NOT NULL,
        value INT NULL,
        restores DECIMAL NULL,
        additional_uses INT[] NULL,
        description TEXT NULL
    );

    COPY recoverable_materials FROM '/docker-entrypoint-initdb.d/data/compendium/recoverable_materials.csv' DELIMITER ',' CSV HEADER;

    -- Init /compendium domain
    DROP MATERIALIZED VIEW IF EXISTS material_views;
    DROP MATERIALIZED VIEW IF EXISTS monster_views;
    DROP MATERIALIZED VIEW IF EXISTS treasure_views;
    DROP MATERIALIZED VIEW IF EXISTS creature_views;

    DROP TABLE IF EXISTS creatures;
    DROP TABLE IF EXISTS monsters;
    DROP TABLE IF EXISTS materials_additional_uses;
    DROP TABLE IF EXISTS materials;
    DROP TABLE IF EXISTS weapons;
    DROP TABLE IF EXISTS bows;
    DROP TABLE IF EXISTS arrows;
    DROP TABLE IF EXISTS shields;
    DROP TABLE IF EXISTS treasures;

    CREATE TABLE creatures
    (
        id INT PRIMARY KEY NOT NULL,
        compendium_id INT NULL,
        compendium_id_dlc_2 INT NULL,
        compendium_id_master_mode INT NULL,
        compendium_id_master_mode_dlc_2 INT NULL,
        name TEXT NOT NULL,
        creature_type TEXT NOT NULL,
        recoverable_materials INT[] NULL,
        description TEXT NOT NULL
    );

    CREATE TABLE monsters
    (
        id INT PRIMARY KEY NOT NULL,
        compendium_id INT NULL,
        compendium_id_dlc_2 INT NULL,
        compendium_id_master_mode INT NULL,
        compendium_id_master_mode_dlc_2 INT NULL,
        name TEXT NOT NULL,
        monster_type TEXT NOT NULL,
        health INT NULL,
        base_damage INT NULL,
        recoverable_materials INT[] NULL,
        description TEXT NOT NULL
    );

    CREATE TABLE materials_additional_uses
    (
        id INT PRIMARY KEY NOT NULL,
        additional_use TEXT NOT NULL
    );

    CREATE TABLE materials
    (
        id INT PRIMARY KEY NOT NULL,
        compendium_id INT NOT NULL,
        compendium_id_dlc_2 INT NOT NULL,
        compendium_id_master_mode INT NOT NULL,
        compendium_id_master_mode_dlc_2 INT NOT NULL,
        name TEXT NOT NULL,
        material_type TEXT NOT NULL,
        value INT NOT NULL,
        restores DECIMAL NULL,
        additional_uses INT[] NULL,
        description TEXT
    );

    CREATE TABLE weapons
    (
        id INT PRIMARY KEY NOT NULL,
        compendium_id INT NULL,
        compendium_id_dlc_2 INT NULL,
        compendium_id_master_mode INT NULL,
        compendium_id_master_mode_dlc_2 INT NULL,
        name TEXT NOT NULL,
        hands INT,
        weapon_type TEXT,
        attack_power INT NULL,
        durability INT NULL,
        locations INT[] NULL,
        dropped_by TEXT NULL,
        description TEXT
    );

    CREATE TABLE bows
    (
        id INT PRIMARY KEY NOT NULL,
        compendium_id INT,
        compendium_id_dlc_2 INT,
        compendium_id_master_mode INT,
        compendium_id_master_mode_dlc_2 INT,
        name TEXT NOT NULL,
        attack_power INT,
        durability INT,
        range INT,
        fire_rate INT,
        locations INT[] NULL,
        dropped_by TEXT NULL,
        description TEXT
    );

    CREATE TABLE arrows
    (
        id INT PRIMARY KEY NOT NULL,
        compendium_id INT NULL,
        compendium_id_dlc_2 INT NULL,
        compendium_id_master_mode INT NULL,
        compendium_id_master_mode_dlc_2 INT NULL,
        name TEXT NOT NULL,
        attack_power_min INT,
        attack_power_max INT,
        effects TEXT,
        description TEXT
    );

    CREATE TABLE shields
    (
        id INT PRIMARY KEY NOT NULL,
        compendium_id INT NULL,
        compendium_id_dlc_2 INT NULL,
        compendium_id_master_mode INT NULL,
        compendium_id_master_mode_dlc_2 INT NULL,
        name TEXT NOT NULL,
        strength INT,
        durability INT,
        locations INT[] NULL,
        dropped_by TEXT NULL,
        description TEXT
    );

    CREATE TABLE treasures
    (
        id INT PRIMARY KEY NOT NULL,
        compendium_id INT NOT NULL,
        compendium_id_dlc_2 INT NOT NULL,
        compendium_id_master_mode INT NOT NULL,
        compendium_id_master_mode_dlc_2 INT NOT NULL,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        recoverable_materials INT[] NULL
    );

    COPY creatures FROM '/docker-entrypoint-initdb.d/data/compendium/creatures.csv' DELIMITER ',' CSV HEADER;
    COPY monsters FROM '/docker-entrypoint-initdb.d/data/compendium/monsters.csv' DELIMITER ',' CSV HEADER;
    COPY materials_additional_uses FROM '/docker-entrypoint-initdb.d/data/compendium/materials_additional_uses.csv' DELIMITER ',' CSV HEADER;
    COPY materials FROM '/docker-entrypoint-initdb.d/data/compendium/materials.csv' DELIMITER ',' CSV HEADER;
    COPY weapons FROM '/docker-entrypoint-initdb.d/data/compendium/weapons.csv' DELIMITER ',' CSV HEADER;
    COPY bows FROM '/docker-entrypoint-initdb.d/data/compendium/bows.csv' DELIMITER ',' CSV HEADER;
    COPY arrows FROM '/docker-entrypoint-initdb.d/data/compendium/arrows.csv' DELIMITER ',' CSV HEADER;
    COPY shields FROM '/docker-entrypoint-initdb.d/data/compendium/shields.csv' DELIMITER ',' CSV HEADER;
    COPY treasures FROM '/docker-entrypoint-initdb.d/data/compendium/treasures.csv' DELIMITER ',' CSV HEADER;

    -- Data structured for consumer
    CREATE MATERIALIZED VIEW creature_views
    AS
    SELECT
        creatures.compendium_id,
        creatures.compendium_id_dlc_2,
        creatures.compendium_id_master_mode,
        creatures.compendium_id_master_mode_dlc_2,
        creatures.name,
        creatures.creature_type,
        array_agg(recoverable_materials.name) as recoverable_materials,
        creatures.description
    FROM creatures
    LEFT JOIN recoverable_materials on recoverable_materials.id = any(recoverable_materials)
    GROUP BY creatures.id
    ORDER BY creatures.id ASC
    WITH DATA;

    CREATE MATERIALIZED VIEW monster_views
    AS
    SELECT
        monsters.compendium_id,
        monsters.compendium_id_dlc_2,
        monsters.compendium_id_master_mode,
        monsters.compendium_id_master_mode_dlc_2,
        monsters.name,
        monsters.monster_type,
        monsters.health,
        monsters.base_damage,
        array_agg(recoverable_materials.name) as recoverable_materials,
        monsters.description
    FROM monsters
    LEFT JOIN recoverable_materials on recoverable_materials.id = any(recoverable_materials)
    GROUP BY monsters.id
    ORDER BY monsters.id ASC
    WITH DATA;

    CREATE MATERIALIZED VIEW material_views
    AS
    SELECT
        materials.compendium_id,
        materials.compendium_id_dlc_2,
        materials.compendium_id_master_mode,
        materials.compendium_id_master_mode_dlc_2,
        materials.name,
        materials.material_type,
        materials.value,
        materials.restores,
        materials.description,
        array_agg(additional_use) as additional_uses
    FROM materials
    LEFT JOIN materials_additional_uses on materials_additional_uses.id = any(additional_uses)
    GROUP BY materials.id
    ORDER BY materials.id ASC
    WITH DATA;

    CREATE MATERIALIZED VIEW treasure_views
    AS
    SELECT
        treasures.compendium_id,
        treasures.compendium_id_dlc_2,
        treasures.compendium_id_master_mode,
        treasures.compendium_id_master_mode_dlc_2,
        treasures.name,
        array_agg(recoverable_materials.name) as recoverable_materials,
        treasures.description
    FROM treasures
    LEFT JOIN recoverable_materials on recoverable_materials.id = any(recoverable_materials)
    GROUP BY treasures.id
    ORDER BY treasures.id ASC
    WITH DATA;

    -- Init /geography domain
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

    COPY location_types FROM '/docker-entrypoint-initdb.d/data/geography/locationType.csv' DELIMITER ',' CSV HEADER;
    COPY regions FROM '/docker-entrypoint-initdb.d/data/geography/region.csv' DELIMITER ',' CSV HEADER;
    COPY subregions FROM '/docker-entrypoint-initdb.d/data/geography/subregion.csv' DELIMITER ',' CSV HEADER;
    COPY locations FROM '/docker-entrypoint-initdb.d/data/geography/location.csv' DELIMITER ',' CSV HEADER;

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
