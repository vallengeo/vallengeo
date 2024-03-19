CREATE TABLE cidadao.processo
(
    id                      UUID        NOT NULL,
    protocolo               VARCHAR(50) NOT NULL,
    id_grupo                UUID        NOT NULL,
    data_cadastro           TIMESTAMP   NOT NULL DEFAULT NOW(),
    data_alteracao          TIMESTAMP   NULL,
    id_usuario              UUID        NOT NULL,
    data_cancelamento       TIMESTAMP   NULL,
    id_usuario_cancelamento UUID        NULL,
    CONSTRAINT pk_processo PRIMARY KEY (id),
    CONSTRAINT fk_processo_grupo FOREIGN KEY (id_grupo) REFERENCES portal_seguranca.grupo (id),
    CONSTRAINT fk_processo_usuario_cadastro FOREIGN KEY (id_usuario) REFERENCES portal_seguranca.usuario (id),
    CONSTRAINT fk_processo_usuario_cancelamento FOREIGN KEY (id_usuario_cancelamento) REFERENCES portal_seguranca.usuario (id)
);

COMMENT ON TABLE cidadao.processo IS 'Entidade responsável por armazenar a solicitação.';

COMMENT ON COLUMN cidadao.processo.id IS 'Identificador único da solicitação.';
COMMENT ON COLUMN cidadao.processo.protocolo IS 'Protocolo da solicitação.';
COMMENT ON COLUMN cidadao.processo.data_cadastro IS 'Data de cadastro da solicitação.';
COMMENT ON COLUMN cidadao.processo.data_alteracao IS 'Data de cadastro da solicitação.';
COMMENT ON COLUMN cidadao.processo.id_usuario IS 'Usuário responsável pelo cadastro da solicitação.';
COMMENT ON COLUMN cidadao.processo.data_cancelamento IS 'Data de cancelamento da solicitação.';
COMMENT ON COLUMN cidadao.processo.id_usuario_cancelamento IS 'Usuário responsável pelo cancelamento da solicitação.';

COMMENT ON CONSTRAINT fk_processo_grupo ON cidadao.processo IS 'Chave estrangeira que referencia o grupo do processo';
COMMENT ON CONSTRAINT fk_processo_usuario_cadastro ON cidadao.processo IS 'Chave estrangeira que referencia o usuário responsável pelo cadastro';
COMMENT ON CONSTRAINT fk_processo_usuario_cadastro ON cidadao.processo IS 'Chave estrangeira que referencia o usuário responsável pelo cancelamento.';