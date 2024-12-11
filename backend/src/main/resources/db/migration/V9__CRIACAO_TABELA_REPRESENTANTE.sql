CREATE TABLE cidadao.representante
(
    id_pessoa        UUID         NOT NULL,
    contato_nome     VARCHAR(255) NOT NULL,
    contato_telefone VARCHAR(20)  NOT NULL,
    CONSTRAINT representante_pk PRIMARY KEY (id_pessoa),
    CONSTRAINT fk_representante_pessoa FOREIGN KEY (id_pessoa) REFERENCES portal_seguranca.pessoa (id)
);

COMMENT ON TABLE cidadao.representante IS 'Tabela que armazena informações sobre representante';

COMMENT ON COLUMN cidadao.representante.id_pessoa IS 'Chave estrangeira referenciando a tabela pessoa';
COMMENT ON COLUMN cidadao.representante.contato_nome IS 'Nome da pessoa de contato';
COMMENT ON COLUMN cidadao.representante.contato_telefone IS 'Telefone da pessoa de contato';

COMMENT ON CONSTRAINT representante_pk ON cidadao.representante IS 'Chave primária da tabela representante';
COMMENT ON CONSTRAINT fk_representante_pessoa ON cidadao.representante IS 'Chave estrangeira que referencia a tabela pessoa';