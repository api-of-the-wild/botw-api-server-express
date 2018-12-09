-- GRANT ALL PRIVILEGES ON DATABASE botw TO admin;

-- DROP MATERIALIZED VIEW IF EXISTS location_views;
DROP TABLE IF EXISTS weapons;
DROP TABLE IF EXISTS bows;
DROP TABLE IF EXISTS arrows;
DROP TABLE IF EXISTS shields;

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

COPY weapons FROM '/Users/kwhitejr/Projects/api-of-the-wild/botw-api-server-express/db/data/compendium/weapons.csv' DELIMITER ',' CSV HEADER;
COPY bows FROM '/Users/kwhitejr/Projects/api-of-the-wild/botw-api-server-express/db/data/compendium/bows.csv' DELIMITER ',' CSV HEADER;
COPY arrows FROM '/Users/kwhitejr/Projects/api-of-the-wild/botw-api-server-express/db/data/compendium/arrows.csv' DELIMITER ',' CSV HEADER;
COPY shields FROM '/Users/kwhitejr/Projects/api-of-the-wild/botw-api-server-express/db/data/compendium/shields.csv' DELIMITER ',' CSV HEADER;
