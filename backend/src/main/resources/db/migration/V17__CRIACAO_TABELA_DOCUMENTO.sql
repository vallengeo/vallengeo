CREATE TABLE cidadao.documento
(
    id_arquivo        uuid NOT NULL,
    id_processo       uuid NOT NULL,
    id_tipo_documento int8 NOT NULL,
    CONSTRAINT pk_documento PRIMARY KEY (id_arquivo),
    CONSTRAINT fk_arquivo FOREIGN KEY (id_arquivo) REFERENCES dado_global.arquivo (id) ON DELETE CASCADE,
    CONSTRAINT fk_processo FOREIGN KEY (id_processo) REFERENCES cidadao.processo (id) ON DELETE CASCADE,
    CONSTRAINT fk_tipo_documento FOREIGN KEY (id_tipo_documento) REFERENCES cidadao.tipo_documento (id) ON DELETE CASCADE
);

CREATE INDEX documento_idx ON cidadao.documento USING btree (id_processo, id_tipo_documento);

COMMENT ON TABLE cidadao.documento IS 'Entidade responsável por armazenar os documentos.';
COMMENT ON COLUMN cidadao.documento.id_processo IS 'Identificador único da tabela processo.';
COMMENT ON COLUMN cidadao.documento.id_tipo_documento IS 'Identificador único da tabela tipo_documento.';

COMMENT ON CONSTRAINT fk_arquivo ON cidadao.documento IS 'Chave estrangeira que referencia o arquivo';
COMMENT ON CONSTRAINT fk_processo ON cidadao.documento IS 'Chave estrangeira que referencia o processo.';
COMMENT ON CONSTRAINT fk_tipo_documento ON cidadao.documento IS 'Chave estrangeira que referencia o tipo do documento.';