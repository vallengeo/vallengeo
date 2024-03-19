CREATE OR REPLACE FUNCTION inserir_grupo_tipo_documento()
    RETURNS TRIGGER AS
$$
BEGIN
    -- tipo documento 'OUTROS'
    INSERT INTO cidadao.rel_grupo_tipo_documento (id_grupo, id_tipo_documento, obrigatorio)
    VALUES (new.id_grupo, 1, FALSE);

    -- tipo documento 'Limite do Imóvel'
    INSERT INTO cidadao.rel_grupo_tipo_documento (id_grupo, id_tipo_documento, obrigatorio)
    VALUES (new.id_grupo, 2, TRUE);

    RETURN new;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trigger_inserir_grupo_tipo_documento
    AFTER INSERT
    ON portal_seguranca.grupo_modulo
    FOR EACH ROW
    WHEN (new.id_modulo = '43565cab-bf9f-4b10-b70a-25dfc923bd2a') -- aciona apenas quando o modulo for 'CIDADÃO'
EXECUTE FUNCTION inserir_grupo_tipo_documento();