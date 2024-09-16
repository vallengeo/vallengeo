CREATE TABLE cidadao.historico_anotacao_consideracao_tecnica
(
    id            SERIAL,
    data_cadastro TIMESTAMP     NOT NULL DEFAULT NOW(),
    descricao     varchar(5000) NULL,
    envia_email   bool          NOT NULL DEFAULT FALSE,
    id_processo   uuid          NOT NULL,
    id_usuario    uuid          NOT NULL,
    CONSTRAINT pk_historico_anotacao_consideracao_tecnica PRIMARY KEY (id),
    CONSTRAINT fk_processo FOREIGN KEY (id_processo) REFERENCES cidadao.processo (id) ON DELETE CASCADE,
    CONSTRAINT fk_usuario FOREIGN KEY (id_usuario) REFERENCES portal_seguranca.usuario (id)
);

COMMENT ON TABLE cidadao.historico_anotacao_consideracao_tecnica IS 'Entidade responsável por armazenar histórico das anotações de consideração técnica.';

COMMENT ON COLUMN cidadao.historico_anotacao_consideracao_tecnica.id IS 'Identificador único do historico.';

COMMENT ON COLUMN cidadao.historico_anotacao_consideracao_tecnica.data_cadastro IS 'Data de cadastro do histórico.';

COMMENT ON COLUMN cidadao.historico_anotacao_consideracao_tecnica.descricao IS 'Descrição do histórico.';

COMMENT ON COLUMN cidadao.historico_anotacao_consideracao_tecnica.envia_email IS 'Flag que verifica se envia email para os responsáveis técnicos.';

COMMENT ON COLUMN cidadao.historico_anotacao_consideracao_tecnica.id_processo IS 'Chave estrangeira da tabela processo.';

COMMENT ON COLUMN cidadao.historico_anotacao_consideracao_tecnica.id_usuario IS 'Chave estrangeira da tabela usuário.';