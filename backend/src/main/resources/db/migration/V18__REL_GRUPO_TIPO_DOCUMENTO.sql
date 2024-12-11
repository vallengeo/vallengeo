CREATE TABLE cidadao.rel_grupo_tipo_documento
(
    id_grupo          UUID NOT NULL,
    id_tipo_documento int8 NOT NULL,
    obrigatorio       bool NOT NULL DEFAULT TRUE,
    CONSTRAINT rel_grupo_tipo_documento_pk PRIMARY KEY (id_grupo, id_tipo_documento),
    CONSTRAINT rel_grupo_tipo_documento_un UNIQUE (id_grupo, id_tipo_documento),
    CONSTRAINT grupo_fk FOREIGN KEY (id_grupo) REFERENCES portal_seguranca.grupo (id) ON DELETE CASCADE,
    CONSTRAINT tipo_documento_fk FOREIGN KEY (id_tipo_documento) REFERENCES cidadao.tipo_documento (id) ON DELETE CASCADE
);

CREATE INDEX rel_grupo_tipo_documento_idx ON cidadao.rel_grupo_tipo_documento USING btree (id_grupo, id_tipo_documento);

COMMENT ON TABLE cidadao.rel_grupo_tipo_documento IS 'Tabela que armazena a associação entre grupos e tipos de documentos.';

COMMENT ON COLUMN cidadao.rel_grupo_tipo_documento.id_grupo IS 'Identificador do grupo associado à relação';
COMMENT ON COLUMN cidadao.rel_grupo_tipo_documento.id_tipo_documento IS 'Identificador do tipo de documento associado à relação';
COMMENT ON COLUMN cidadao.rel_grupo_tipo_documento.obrigatorio IS 'Flag de obrigatoriedade para envio do documento.';