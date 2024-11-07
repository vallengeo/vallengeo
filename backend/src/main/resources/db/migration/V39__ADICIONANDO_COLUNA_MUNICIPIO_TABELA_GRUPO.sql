ALTER TABLE portal_seguranca.grupo
ADD COLUMN id_municipio int4 NULL;

COMMENT ON COLUMN portal_seguranca.grupo.id_municipio IS 'Identificador do município do grupo.';