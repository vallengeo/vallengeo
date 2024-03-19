CREATE TABLE cidadao.responsavel_tecnico
(
    id            uuid         NOT NULL,
    cpf           VARCHAR(11)  NOT NULL,
    email         VARCHAR(100) NOT NULL,
    data_cadastro TIMESTAMP    NOT NULL DEFAULT NOW(),
    id_pessoa        UUID         NULL,
    CONSTRAINT pk_responsavel_tecnico PRIMARY KEY (id),
    CONSTRAINT un_responsavel_tecnico_cpf UNIQUE (cpf),
    CONSTRAINT fk_pessoa FOREIGN KEY (id_pessoa) REFERENCES portal_seguranca.pessoa (id)
);

COMMENT ON TABLE cidadao.responsavel_tecnico IS 'Entidade responsável por armazenar o responsável técnico do processo.';
COMMENT ON COLUMN cidadao.responsavel_tecnico.id IS 'Identificador único do responsável técnico.';
COMMENT ON COLUMN cidadao.responsavel_tecnico.id IS 'CPF do responsável técnico.';
COMMENT ON COLUMN cidadao.responsavel_tecnico.email IS 'E-mail do responsável técnico.';
COMMENT ON COLUMN cidadao.responsavel_tecnico.data_cadastro IS 'Data de cadastro.';

COMMENT ON CONSTRAINT fk_pessoa ON cidadao.responsavel_tecnico IS 'Chave estrangeira que referencia a tabela pessoa';