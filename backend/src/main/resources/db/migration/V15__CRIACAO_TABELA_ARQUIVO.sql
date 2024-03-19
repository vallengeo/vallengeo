CREATE TABLE dado_global.arquivo
(
    id              uuid         NOT NULL,
    nome            VARCHAR(255) NOT NULL,
    extensao        VARCHAR(255) NOT NULL,
    tamanho         float        NOT NULL,
    data_envio      timestamp    NOT NULL,
    CONSTRAINT pk_arquivo PRIMARY KEY (id)
);

COMMENT ON TABLE dado_global.arquivo IS 'Entidade responsável por armazenar os arquivos.';
COMMENT ON COLUMN dado_global.arquivo.id IS 'Identificador único do arquivo.';
COMMENT ON COLUMN dado_global.arquivo.nome IS 'Nome do arquivo.';
COMMENT ON COLUMN dado_global.arquivo.extensao IS 'Extensão do arquivo.';
COMMENT ON COLUMN dado_global.arquivo.tamanho IS 'Tamanho do arquivo.';
COMMENT ON COLUMN dado_global.arquivo.data_envio IS 'Data do envio do arquivo.';