DROP MATERIALIZED VIEW IF EXISTS creature_views;
DROP MATERIALIZED VIEW IF EXISTS monster_views;

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

COPY recoverable_materials FROM '/Users/kwhitejr/Projects/api-of-the-wild/botw-api-server-express/db/data/compendium/recoverable_materials.csv' DELIMITER ',' CSV HEADER;
