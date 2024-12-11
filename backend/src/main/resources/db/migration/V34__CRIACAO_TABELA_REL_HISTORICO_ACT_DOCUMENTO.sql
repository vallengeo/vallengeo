CREATE TABLE cidadao.rel_historico_anotacao_consideracao_tecnica_documento (
    id_historico int8 NOT NULL,
    id_documento uuid NOT NULL,
    CONSTRAINT pk_rel_historico_act_documento PRIMARY KEY (id_historico, id_documento),
    CONSTRAINT fk_rel_historico_act_documento_historico FOREIGN KEY (id_historico) REFERENCES cidadao.historico_anotacao_consideracao_tecnica (id) ON DELETE CASCADE,
    CONSTRAINT fk_rel_historico_act_documento FOREIGN KEY (id_documento) REFERENCES cidadao.documento (id_arquivo) ON DELETE CASCADE
);

-- Comentário para a tabela
COMMENT ON TABLE cidadao.rel_historico_anotacao_consideracao_tecnica_documento IS 'Tabela de relacionamento entre histórico de anotações/considerações técnicas e documentos.';

-- Comentários para as colunas
COMMENT ON COLUMN cidadao.rel_historico_anotacao_consideracao_tecnica_documento.id_historico IS 'Identificador do histórico de anotações/considerações técnicas.';
COMMENT ON COLUMN cidadao.rel_historico_anotacao_consideracao_tecnica_documento.id_documento IS 'Identificador do documento relacionado.';

-- Comentários para as restrições
COMMENT ON CONSTRAINT pk_rel_historico_act_documento ON cidadao.rel_historico_anotacao_consideracao_tecnica_documento IS 'Chave primária composta pelos IDs do histórico e do documento.';
COMMENT ON CONSTRAINT fk_rel_historico_act_documento_historico ON cidadao.rel_historico_anotacao_consideracao_tecnica_documento IS 'Chave estrangeira referenciando o ID do histórico de anotações/considerações técnicas, com exclusão em cascata.';
COMMENT ON CONSTRAINT fk_rel_historico_act_documento ON cidadao.rel_historico_anotacao_consideracao_tecnica_documento IS 'Chave estrangeira referenciando o ID do documento, com exclusão em cascata.';
