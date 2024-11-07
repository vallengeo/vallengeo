ALTER TABLE dado_global.camada
ADD COLUMN cor_preenchimento varchar(30),
ADD COLUMN cor_borda varchar(30);

COMMENT ON COLUMN dado_global.camada.cor_preenchimento IS 'Cor do preencimento da camada';
COMMENT ON COLUMN dado_global.camada.cor_borda IS 'Cor da borda da camada';