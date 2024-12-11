DROP TABLE IF EXISTS cidadao.georreferenciamento;

ALTER TABLE cidadao.imovel
ADD COLUMN geometria geometry(geometry, 4674) NOT NULL DEFAULT NULL;

CREATE INDEX sidx_imovel_geometria ON cidadao.imovel USING gist (geometria);

COMMENT ON COLUMN cidadao.imovel.geometria IS 'Geometria do imóvel representada por um tipo de geometria espacial.';