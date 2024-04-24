ALTER TABLE cidadao.representante
ADD contato_documento VARCHAR(14) NOT NULL DEFAULT NULL,
ADD responsavel_tecnico BOOLEAN DEFAULT FALSE,
ADD representante_legal BOOLEAN DEFAULT FALSE,
ADD outro BOOLEAN DEFAULT FALSE;

-- Comentários para as colunas adicionadas
COMMENT ON COLUMN cidadao.representante.contato_documento IS 'Documento de contato do representante.';
COMMENT ON COLUMN cidadao.representante.responsavel_tecnico IS 'Indica se o representante é um responsável técnico.';
COMMENT ON COLUMN cidadao.representante.representante_legal IS 'Indica se o representante é um representante legal.';
COMMENT ON COLUMN cidadao.representante.outro IS 'Indica se o representante tem outro papel ou função.';