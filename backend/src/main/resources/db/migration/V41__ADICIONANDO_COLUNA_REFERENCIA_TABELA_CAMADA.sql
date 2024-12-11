ALTER TABLE dado_global.camada
ADD COLUMN referencia varchar(300);

COMMENT ON COLUMN dado_global.camada.referencia IS 'Indica a referência aonde a camada se encontra no geoserver: schema + table';