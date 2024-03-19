CREATE TABLE cidadao.tipo_documento
(
    id      int8 GENERATED BY DEFAULT AS IDENTITY,
    titulo  VARCHAR(200) NOT NULL,
    formato VARCHAR(50)  NULL,
    CONSTRAINT pk_tipo_documento PRIMARY KEY (id)
);

COMMENT ON TABLE cidadao.tipo_documento IS 'Entidade responsável por armazenar os tipos de documentos.';

COMMENT ON COLUMN cidadao.tipo_documento.id IS 'Identificador único do tipo de documento.';
COMMENT ON COLUMN cidadao.tipo_documento.titulo IS 'Título do tipo de documento.';
COMMENT ON COLUMN cidadao.tipo_documento.formato IS 'Formatos aceitos do tipo de documento.';


INSERT INTO cidadao.tipo_documento (id, titulo, formato)
VALUES (1, 'Outros documentos', NULL);

INSERT INTO cidadao.tipo_documento (id, titulo, formato)
VALUES (2, 'Limite do Imóvel', '.zip,.kml');

SELECT SETVAL('cidadao.tipo_documento_id_seq', 3);