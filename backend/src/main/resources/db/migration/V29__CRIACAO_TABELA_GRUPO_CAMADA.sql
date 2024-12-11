CREATE TABLE dado_global.camada_grupo
(
    id_camada int4 NOT NULL,
    id_grupo  UUID NOT NULL,
    CONSTRAINT camada_grupo_pk PRIMARY KEY (id_camada, id_grupo),
    CONSTRAINT fk_camada FOREIGN KEY (id_camada) REFERENCES dado_global.camada (id),
    CONSTRAINT fk_grupo FOREIGN KEY (id_grupo) REFERENCES portal_seguranca.grupo (id)
);

-- Comentário para a tabela
COMMENT ON TABLE dado_global.camada_grupo IS 'Tabela para associar camadas a grupos de segurança.';

-- Comentários para as colunas
COMMENT ON COLUMN dado_global.camada_grupo.id_camada IS 'ID da camada associada ao grupo.';
COMMENT ON COLUMN dado_global.camada_grupo.id_grupo IS 'UUID do grupo de segurança associado à camada.';

-- Comentários para as restrições
COMMENT ON CONSTRAINT camada_grupo_pk ON dado_global.camada_grupo IS 'Restrição para garantir a unicidade da associação entre camada e grupo.';
COMMENT ON CONSTRAINT fk_camada ON dado_global.camada_grupo IS 'Restrição de chave estrangeira para o ID da camada, referenciando a tabela dado_global.camada.';
COMMENT ON CONSTRAINT fk_grupo ON dado_global.camada_grupo IS 'Restrição de chave estrangeira para o UUID do grupo, referenciando a tabela portal_seguranca.grupo.';