CREATE TABLE cidadao.rel_processo_responsavel_tecnico
(
    id_processo            UUID      NOT NULL,
    id_responsavel_tecnico UUID      NOT NULL,
    vinculado              bool      NOT NULL DEFAULT FALSE,
    data_acao              TIMESTAMP NULL,
    CONSTRAINT pk_rel_processo_responsavel_tecnico PRIMARY KEY (id_processo, id_responsavel_tecnico),
    CONSTRAINT fk_processo FOREIGN KEY (id_processo) REFERENCES cidadao.processo (id) ON DELETE CASCADE,
    CONSTRAINT fk_responsavel_tecnico FOREIGN KEY (id_responsavel_tecnico) REFERENCES cidadao.responsavel_tecnico (id) ON DELETE CASCADE
);
CREATE INDEX rel_processo_responsavel_tecnico_idx ON cidadao.rel_processo_responsavel_tecnico USING btree (id_processo, id_responsavel_tecnico);

COMMENT ON TABLE cidadao.rel_processo_responsavel_tecnico IS 'Entidade responsável por armazenar o relacionamento entre as tabelas processo e representante técnico';
COMMENT ON COLUMN cidadao.rel_processo_responsavel_tecnico.id_processo IS 'Chave estrangeira da tabela processo.';
COMMENT ON COLUMN cidadao.rel_processo_responsavel_tecnico.id_responsavel_tecnico IS 'Chave estrangeira da tabela responsavel_tecnico.';
COMMENT ON COLUMN cidadao.rel_processo_responsavel_tecnico.vinculado IS 'Flag indicativa de vinculação';
COMMENT ON COLUMN cidadao.rel_processo_responsavel_tecnico.data_acao IS 'Data da vinculação ou desvinculação';
