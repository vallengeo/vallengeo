ALTER TABLE cidadao.representante
    ADD COLUMN contato_email VARCHAR(100);

COMMENT ON COLUMN cidadao.representante.contato_email IS 'Endereço de e-mail do representante';

ALTER TABLE cidadao.representante
    ALTER COLUMN contato_email SET NOT NULL;