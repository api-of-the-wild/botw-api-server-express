-- GRANT ALL PRIVILEGES ON DATABASE botw TO admin;

DROP MATERIALIZED VIEW IF EXISTS material_views;
-- DROP MATERIALIZED VIEW IF EXISTS monster_views;

DROP TABLE IF EXISTS monsters;
DROP TABLE IF EXISTS materials_additional_uses;
DROP TABLE IF EXISTS materials;
DROP TABLE IF EXISTS weapons;
DROP TABLE IF EXISTS bows;
DROP TABLE IF EXISTS arrows;
DROP TABLE IF EXISTS shields;

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

COPY monsters FROM '/Users/kwhitejr/Projects/api-of-the-wild/botw-api-server-express/db/data/compendium/monsters.csv' DELIMITER ',' CSV HEADER;
COPY materials_additional_uses FROM '/Users/kwhitejr/Projects/api-of-the-wild/botw-api-server-express/db/data/compendium/materials_additional_uses.csv' DELIMITER ',' CSV HEADER;
COPY materials FROM '/Users/kwhitejr/Projects/api-of-the-wild/botw-api-server-express/db/data/compendium/materials.csv' DELIMITER ',' CSV HEADER;
COPY weapons FROM '/Users/kwhitejr/Projects/api-of-the-wild/botw-api-server-express/db/data/compendium/weapons.csv' DELIMITER ',' CSV HEADER;
COPY bows FROM '/Users/kwhitejr/Projects/api-of-the-wild/botw-api-server-express/db/data/compendium/bows.csv' DELIMITER ',' CSV HEADER;
COPY arrows FROM '/Users/kwhitejr/Projects/api-of-the-wild/botw-api-server-express/db/data/compendium/arrows.csv' DELIMITER ',' CSV HEADER;
COPY shields FROM '/Users/kwhitejr/Projects/api-of-the-wild/botw-api-server-express/db/data/compendium/shields.csv' DELIMITER ',' CSV HEADER;

-- Data structured for consumer
-- CREATE MATERIALIZED VIEW monster_views
-- AS
-- SELECT
--   compendium_id,
--   compendium_id_dlc_2,
--   compendium_id_master_mode,
--   compendium_id_master_mode_dlc_2,
--   name,
--   monster_type,
--   health,
--   base_damage,
--   array_agg(name) as recoverable_materials,
--   description
-- FROM monsters
-- LEFT JOIN recoverable_materials on recoverable_materials.id = any(recoverable_materials)
-- GROUP BY monsters.id
-- ORDER BY monsters.id ASC
-- WITH DATA;

CREATE MATERIALIZED VIEW material_views
AS
SELECT
  compendium_id,
  compendium_id_dlc_2,
  compendium_id_master_mode,
  compendium_id_master_mode_dlc_2,
  name,
  material_type,
  value,
  restores,
  description,
  array_agg(additional_use) as additional_uses
FROM materials
LEFT JOIN materials_additional_uses on materials_additional_uses.id = any(additional_uses)
GROUP BY materials.id
ORDER BY materials.id ASC
WITH DATA;