CREATE TABLE cidadao.rel_imovel_representante
(
    id_imovel int4 NOT NULL,
    id_pessoa uuid NOT NULL,
    CONSTRAINT pk_rel_imovel_representante PRIMARY KEY (id_imovel, id_pessoa),
    CONSTRAINT fk_imovel FOREIGN KEY (id_imovel) REFERENCES cidadao.imovel (id) ON DELETE CASCADE,
    CONSTRAINT fk_representante FOREIGN KEY (id_pessoa) REFERENCES cidadao.representante (id_pessoa) ON DELETE CASCADE
);
CREATE INDEX rel_imovel_representante_idx ON cidadao.rel_imovel_representante USING btree (id_imovel, id_pessoa);


COMMENT ON TABLE cidadao.rel_imovel_representante IS 'Tabela para relacionar imóveis e representantes';

COMMENT ON COLUMN cidadao.rel_imovel_representante.id_imovel IS 'Chave estrangeira para a tabela imovel';
COMMENT ON COLUMN cidadao.rel_imovel_representante.id_pessoa IS 'Chave estrangeira para a tabela representante';

COMMENT ON CONSTRAINT pk_rel_imovel_representante ON cidadao.rel_imovel_representante IS 'Chave primária para a tabela rel_imovel_representante';
COMMENT ON CONSTRAINT fk_imovel ON cidadao.rel_imovel_representante IS 'Chave estrangeira para a tabela imovel, com ação de exclusão em cascata';
COMMENT ON CONSTRAINT fk_representante ON cidadao.rel_imovel_representante IS 'Chave estrangeira para a tabela representante, com ação de exclusão em cascata';