CREATE TABLE cidadao.imovel
(
    id                       SERIAL PRIMARY KEY,
    inscricao_imobiliaria    VARCHAR(30) NOT NULL,
    id_informacao_imovel     int4        NOT NULL,
    id_caracterizacao_imovel int4        NOT NULL,
    id_processo              uuid        NOT NULL,
    CONSTRAINT fk_imovel_informacao_imovel FOREIGN KEY (id_informacao_imovel) REFERENCES cidadao.informacao_imovel (id),
    CONSTRAINT fk_imovel_caracterizacao_imovel FOREIGN KEY (id_caracterizacao_imovel) REFERENCES cidadao.caracterizacao_imovel (id),
    CONSTRAINT fk_imovel_processo FOREIGN KEY (id_processo) REFERENCES cidadao.processo (id)
);

COMMENT ON TABLE cidadao.imovel IS 'Tabela para armazenar informações sobre os imóveis';

COMMENT ON COLUMN cidadao.imovel.id IS 'Identificador único do imóvel';
COMMENT ON COLUMN cidadao.imovel.inscricao_imobiliaria IS 'Número de inscrição imobiliária';
COMMENT ON COLUMN cidadao.imovel.id_informacao_imovel IS 'Chave estrangeira para a tabela informacao_imovel';
COMMENT ON COLUMN cidadao.imovel.id_caracterizacao_imovel IS 'Chave estrangeira para a tabela caracterizacao_imovel';
COMMENT ON COLUMN cidadao.imovel.id_processo IS 'Chave estrangeira para a tabela processo';

COMMENT ON CONSTRAINT fk_imovel_informacao_imovel ON cidadao.imovel IS 'Chave estrangeira para a tabela informacao_imovel';
COMMENT ON CONSTRAINT fk_imovel_caracterizacao_imovel ON cidadao.imovel IS 'Chave estrangeira para a tabela caracterizacao_imovel';
COMMENT ON CONSTRAINT fk_imovel_processo ON cidadao.imovel IS 'Chave estrangeira para a tabela processo';