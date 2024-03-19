CREATE TABLE dado_global.estado
(
    id   int4        NOT NULL,
    nome VARCHAR(80) NOT NULL,
    uf   varchar(2)  NOT NULL,
    CONSTRAINT pk_estado PRIMARY KEY (id),
    CONSTRAINT estado_uf_un UNIQUE (uf)
);
COMMENT ON TABLE dado_global.estado IS 'Entidade responsável por armazenar estados do Brasil.';
COMMENT ON COLUMN dado_global.estado.id IS 'Identificador único da entidade e código IBGE.';
COMMENT ON COLUMN dado_global.estado.nome IS 'Nome do estado.';
COMMENT ON COLUMN dado_global.estado.uf IS 'Unidade federativa do estado.';

CREATE TABLE dado_global.municipio
(
    id        int4         NOT NULL,
    nome      varchar(200) NOT NULL,
    id_estado int4         NOT NULL,
    CONSTRAINT pk_municipio PRIMARY KEY (id)
);
COMMENT ON TABLE dado_global.municipio IS 'Entidade responsável por armazenar municípios do Brasil.';
COMMENT ON COLUMN dado_global.municipio.id IS 'Identificador único da entidade.';
COMMENT ON COLUMN dado_global.municipio.nome IS 'Nome do município.';
COMMENT ON COLUMN dado_global.municipio.id_estado IS 'Chave estrangeira da tabela estado.';

ALTER TABLE dado_global.municipio
    ADD CONSTRAINT fk_estado FOREIGN KEY (id_estado) REFERENCES dado_global.estado (id);