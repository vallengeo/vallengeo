CREATE TABLE cidadao.rel_processo_situacao_processo
(
    id_processo          uuid      NOT NULL,
    id_situacao_processo int8      NOT NULL,
    data_acao        TIMESTAMP NOT NULL DEFAULT NOW(),
    ativo                bool      NOT NULL DEFAULT FALSE,
    CONSTRAINT pk_rel_processo_situacao_processo PRIMARY KEY (id_processo, id_situacao_processo),
    CONSTRAINT fk_processo FOREIGN KEY (id_processo) REFERENCES cidadao.processo (id) ON DELETE CASCADE,
    CONSTRAINT fk_situacao_processo FOREIGN KEY (id_situacao_processo) REFERENCES cidadao.situacao_processo (id) ON DELETE CASCADE
);
CREATE INDEX processo_situacao_processo_idx ON cidadao.rel_processo_situacao_processo USING btree (id_processo, id_situacao_processo);

COMMENT ON TABLE cidadao.rel_processo_situacao_processo IS 'Entidade responsável por armazenar o relacionamento entre as tabelas processo e situacao do processo';
COMMENT ON COLUMN cidadao.rel_processo_situacao_processo.id_processo IS 'Chave estrangeira da tabela processo.';
COMMENT ON COLUMN cidadao.rel_processo_situacao_processo.id_situacao_processo IS 'Chave estrangeira da tabela situacao_processo.';
COMMENT ON COLUMN cidadao.rel_processo_situacao_processo.data_acao IS 'Data da ativação ou desativação';
COMMENT ON COLUMN cidadao.rel_processo_situacao_processo.ativo IS 'Flag indicativa de ativo';