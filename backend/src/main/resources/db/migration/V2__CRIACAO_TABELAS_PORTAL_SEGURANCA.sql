CREATE TABLE portal_seguranca.usuario
(
    id               UUID         NOT NULL,
    email            VARCHAR(200) NOT NULL,
    senha_hash       VARCHAR(255) NOT NULL,
    data_cadastro    TIMESTAMP DEFAULT now(),
    data_atualizacao TIMESTAMP,
    ativo            BOOLEAN      NOT NULL,
    codigo_acesso    VARCHAR(255),
    validade_codigo  TIMESTAMP,
    CONSTRAINT usuario_pk PRIMARY KEY (id),
    CONSTRAINT usuario_email_un UNIQUE (email)
);

CREATE TABLE portal_seguranca.perfil
(
    id     UUID         NOT NULL,
    nome   VARCHAR(255) NOT NULL,
    codigo VARCHAR(50)  NOT NULL,
    CONSTRAINT perfil_pk PRIMARY KEY (id),
    CONSTRAINT perfil_codigo_un UNIQUE (codigo)
);

CREATE TABLE portal_seguranca.modulo
(
    id     UUID         NOT NULL,
    nome   VARCHAR(255) NOT NULL,
    codigo VARCHAR(50)  NOT NULL,
    url    VARCHAR(255) NOT NULL,
    ativo  BOOLEAN      NOT NULL,
    CONSTRAINT modulo_pk PRIMARY KEY (id),
    CONSTRAINT modulo_codigo_un UNIQUE (codigo)
);

CREATE TABLE portal_seguranca.grupo
(
    id     UUID         NOT NULL,
    nome   VARCHAR(255) NOT NULL,
    codigo VARCHAR(50)  NOT NULL,
    CONSTRAINT grupo_pk PRIMARY KEY (id),
    CONSTRAINT grupo_codigo_un UNIQUE (codigo)

);
COMMENT ON TABLE portal_seguranca.grupo IS 'Tabela responsável por armazenar os dados das prefeituras';

CREATE TABLE portal_seguranca.tela
(
    id     UUID         NOT NULL,
    nome   VARCHAR(255) NOT NULL,
    codigo VARCHAR(50)  NOT NULL,
    CONSTRAINT tela_pk PRIMARY KEY (id),
    CONSTRAINT tela_codigo_un UNIQUE (codigo)
);

CREATE TABLE portal_seguranca.permissao
(
    id     UUID         NOT NULL,
    nome   VARCHAR(255) NOT NULL,
    codigo VARCHAR(50)  NOT NULL,
    CONSTRAINT permissao_pk PRIMARY KEY (id),
    CONSTRAINT permissao_codigo_un UNIQUE (codigo)
);

CREATE TABLE portal_seguranca.usuario_grupo_perfil
(
    id_usuario UUID NOT NULL,
    id_grupo   UUID NOT NULL,
    id_perfil  UUID NOT NULL,
    CONSTRAINT usuario_grupo_perfil_pk PRIMARY KEY (id_usuario, id_grupo, id_perfil),
    CONSTRAINT usuario_grupo_perfil_usuario_fk FOREIGN KEY (id_usuario) REFERENCES portal_seguranca.usuario (id) ON DELETE CASCADE,
    CONSTRAINT usuario_grupo_perfil_grupo_fk FOREIGN KEY (id_grupo) REFERENCES portal_seguranca.grupo (id) ON DELETE CASCADE,
    CONSTRAINT usuario_grupo_perfil_perfil_fk FOREIGN KEY (id_perfil) REFERENCES portal_seguranca.perfil (id) ON DELETE CASCADE
);

CREATE INDEX usuario_grupo_perfil_idx ON portal_seguranca.usuario_grupo_perfil USING btree (id_usuario, id_grupo, id_perfil);

CREATE TABLE portal_seguranca.modulo_tela
(
    id_modulo UUID NOT NULL,
    id_tela   UUID NOT NULL,
    CONSTRAINT modulo_tela_pk PRIMARY KEY (id_modulo, id_tela),
    CONSTRAINT modulo_tela_modulo_fk FOREIGN KEY (id_modulo) REFERENCES portal_seguranca.modulo (id) ON DELETE CASCADE,
    CONSTRAINT modulo_tela_tela_fk FOREIGN KEY (id_tela) REFERENCES portal_seguranca.tela (id) ON DELETE CASCADE
);
CREATE INDEX modulo_tela_idx ON portal_seguranca.modulo_tela USING btree (id_tela, id_modulo);

CREATE TABLE portal_seguranca.grupo_perfil
(
    id_grupo  UUID NOT NULL,
    id_perfil UUID NOT NULL,
    CONSTRAINT grupo_perfil_pk PRIMARY KEY (id_grupo, id_perfil),
    CONSTRAINT grupo_perfil_grupo_fk FOREIGN KEY (id_grupo) REFERENCES portal_seguranca.grupo (id) ON DELETE CASCADE,
    CONSTRAINT grupo_perfil_perfil_fk FOREIGN KEY (id_perfil) REFERENCES portal_seguranca.perfil (id) ON DELETE CASCADE
);
CREATE INDEX grupo_perfil_idx ON portal_seguranca.grupo_perfil USING btree (id_grupo, id_perfil);

CREATE TABLE portal_seguranca.grupo_modulo
(
    id_grupo  UUID NOT NULL,
    id_modulo UUID NOT NULL,
    CONSTRAINT grupo_modulo_pk PRIMARY KEY (id_grupo, id_modulo),
    CONSTRAINT grupo_modulo_grupo_fk FOREIGN KEY (id_grupo) REFERENCES portal_seguranca.grupo (id) ON DELETE CASCADE,
    CONSTRAINT grupo_modulo_modulo_fk FOREIGN KEY (id_modulo) REFERENCES portal_seguranca.modulo (id) ON DELETE CASCADE
);
CREATE INDEX grupo_modulo_idx ON portal_seguranca.grupo_modulo USING btree (id_grupo, id_modulo);

CREATE TABLE portal_seguranca.grupo_perfil_tela_permissao
(
    id_grupo     UUID NOT NULL,
    id_perfil    UUID NOT NULL,
    id_tela      UUID NOT NULL,
    id_permissao UUID NOT NULL,
    CONSTRAINT grupo_perfil_tela_permissao_pk PRIMARY KEY (id_grupo, id_perfil, id_tela, id_permissao),
    CONSTRAINT grupo_perfil_tela_permissao_grupo_fk FOREIGN KEY (id_grupo) REFERENCES portal_seguranca.grupo (id) ON DELETE CASCADE,
    CONSTRAINT grupo_perfil_tela_permissao_perfil_fk FOREIGN KEY (id_perfil) REFERENCES portal_seguranca.perfil (id) ON DELETE CASCADE,
    CONSTRAINT grupo_perfil_tela_permissao_tela_fk FOREIGN KEY (id_tela) REFERENCES portal_seguranca.tela (id) ON DELETE CASCADE,
    CONSTRAINT grupo_perfil_tela_permissao_acao_fk FOREIGN KEY (id_permissao) REFERENCES portal_seguranca.permissao (id) ON DELETE CASCADE
);

CREATE INDEX grupo_perfil_tela_permissao_idx ON portal_seguranca.grupo_perfil_tela_permissao USING btree (id_grupo, id_perfil, id_tela, id_permissao);