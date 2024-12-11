CREATE TABLE portal_seguranca.pessoa
(
    id               UUID         NOT NULL,
    email            VARCHAR(100) NOT NULL,
    telefone         VARCHAR(20)  NOT NULL,
    data_cadastro    TIMESTAMP DEFAULT NOW(),
    data_atualizacao TIMESTAMP,
    id_endereco      int8         NOT NULL,
    CONSTRAINT pessoa_pk PRIMARY KEY (id),
    CONSTRAINT fk_pessoa_endereco FOREIGN KEY (id_endereco) REFERENCES dado_global.endereco (id)

);
COMMENT ON TABLE portal_seguranca.pessoa IS 'Tabela que armazena informações sobre pessoas';

COMMENT ON COLUMN portal_seguranca.pessoa.id IS 'Identificador único da pessoa';
COMMENT ON COLUMN portal_seguranca.pessoa.email IS 'Endereço de e-mail da pessoa';
COMMENT ON COLUMN portal_seguranca.pessoa.telefone IS 'Número de telefone da pessoa';
COMMENT ON COLUMN portal_seguranca.pessoa.data_cadastro IS 'Data de cadastro da pessoa';
COMMENT ON COLUMN portal_seguranca.pessoa.data_atualizacao IS 'Data da última atualização dos dados da pessoa';

COMMENT ON CONSTRAINT fk_pessoa_endereco ON portal_seguranca.pessoa IS 'Chave estrangeira que referencia a tabela endereço';

CREATE TABLE portal_seguranca.pessoa_fisica
(
    id_pessoa UUID         NOT NULL,
    nome      VARCHAR(255) NOT NULL,
    cpf       VARCHAR(255) NOT NULL,
    rg        VARCHAR(255),
    CONSTRAINT pessoa_fisica_pk PRIMARY KEY (id_pessoa),
    CONSTRAINT cpf_un UNIQUE (cpf),
    CONSTRAINT fk_pessoa_fisica_pessoa FOREIGN KEY (id_pessoa) REFERENCES portal_seguranca.pessoa (id)
);

COMMENT ON TABLE portal_seguranca.pessoa_fisica IS 'Tabela que armazena informações sobre pessoas físicas';

COMMENT ON COLUMN portal_seguranca.pessoa_fisica.id_pessoa IS 'Chave estrangeira referenciando a tabela pessoa';
COMMENT ON COLUMN portal_seguranca.pessoa_fisica.nome IS 'Nome da pessoa física';
COMMENT ON COLUMN portal_seguranca.pessoa_fisica.cpf IS 'CPF da pessoa física';
COMMENT ON COLUMN portal_seguranca.pessoa_fisica.rg IS 'RG da pessoa física';

COMMENT ON CONSTRAINT pessoa_fisica_pk ON portal_seguranca.pessoa_fisica IS 'Chave primária da tabela pessoa_fisica';
COMMENT ON CONSTRAINT fk_pessoa_fisica_pessoa ON portal_seguranca.pessoa_fisica IS 'Chave estrangeira que referencia a tabela pessoa';

CREATE TABLE portal_seguranca.pessoa_juridica
(
    id_pessoa      UUID         NOT NULL,
    razao_social   VARCHAR(255) NOT NULL,
    cnpj           VARCHAR(255) NOT NULL,
    id_responsavel UUID,
    CONSTRAINT pessoa_juridica_pk PRIMARY KEY (id_pessoa),
    CONSTRAINT cnpj_un UNIQUE (cnpj),
    CONSTRAINT fk_pessoa_juridica_pessoa FOREIGN KEY (id_pessoa) REFERENCES portal_seguranca.pessoa (id),
    CONSTRAINT fk_pessoa_juridica_responsavel FOREIGN KEY (id_responsavel) REFERENCES portal_seguranca.pessoa (id)
);

COMMENT ON TABLE portal_seguranca.pessoa_juridica IS 'Tabela que armazena informações sobre pessoas jurídicas';

COMMENT ON COLUMN portal_seguranca.pessoa_juridica.id_pessoa IS 'Chave estrangeira referenciando a tabela pessoa';
COMMENT ON COLUMN portal_seguranca.pessoa_juridica.cnpj IS 'CNPJ da pessoa jurídica';
COMMENT ON COLUMN portal_seguranca.pessoa_juridica.razao_social IS 'Razão social da pessoa jurídica';

COMMENT ON CONSTRAINT pessoa_juridica_pk ON portal_seguranca.pessoa_juridica IS 'Chave primária da tabela pessoa_juridica';
COMMENT ON CONSTRAINT fk_pessoa_juridica_pessoa ON portal_seguranca.pessoa_juridica IS 'Chave estrangeira que referencia a tabela pessoa';
COMMENT ON CONSTRAINT fk_pessoa_juridica_responsavel ON portal_seguranca.pessoa_juridica IS 'Chave estrangeira que referencia a tabela pessoa com responsável';

CREATE TABLE portal_seguranca.usuario
(
    id                  UUID         NOT NULL,
    email               VARCHAR(200) NOT NULL,
    senha_hash          VARCHAR(255),
    data_cadastro       TIMESTAMP             DEFAULT NOW(),
    data_atualizacao    TIMESTAMP,
    ativo               BOOLEAN      NOT NULL DEFAULT FALSE,
    codigo_acesso       VARCHAR(255),
    validade_codigo     TIMESTAMP,
    data_exclusao       TIMESTAMP,
    id_usuario_exclusao UUID,
    id_pessoa           UUID,
    CONSTRAINT usuario_pk PRIMARY KEY (id),
    CONSTRAINT usuario_email_un UNIQUE (email),
    CONSTRAINT usuario_fk FOREIGN KEY (id_usuario_exclusao) REFERENCES portal_seguranca.usuario (id),
    CONSTRAINT pessoa_fk FOREIGN KEY (id_pessoa) REFERENCES portal_seguranca.pessoa (id)
);

-- Comentário para a tabela usuario
COMMENT ON TABLE portal_seguranca.usuario IS 'Tabela que armazena informações sobre usuários no portal de segurança';

-- Comentários para colunas da tabela usuario
COMMENT ON COLUMN portal_seguranca.usuario.id IS 'Identificador único do usuário (UUID)';
COMMENT ON COLUMN portal_seguranca.usuario.email IS 'Endereço de e-mail do usuário';
COMMENT ON COLUMN portal_seguranca.usuario.senha_hash IS 'Hash da senha do usuário';
COMMENT ON COLUMN portal_seguranca.usuario.data_cadastro IS 'Data e hora de cadastro do usuário (preenchido automaticamente com o valor atual)';
COMMENT ON COLUMN portal_seguranca.usuario.data_atualizacao IS 'Data e hora da última atualização do usuário';
COMMENT ON COLUMN portal_seguranca.usuario.ativo IS 'Indica se o usuário está ativo ou inativo';
COMMENT ON COLUMN portal_seguranca.usuario.codigo_acesso IS 'Código de acesso associado ao usuário';
COMMENT ON COLUMN portal_seguranca.usuario.validade_codigo IS 'Data e hora de validade do código de acesso';
COMMENT ON COLUMN portal_seguranca.usuario.data_exclusao IS 'Data e hora da exclusão do usuário';
COMMENT ON COLUMN portal_seguranca.usuario.id_usuario_exclusao IS 'Identificador único do usuário que realizou a exclusão';

-- Comentário para a restrição de chave estrangeira usuario_fk
COMMENT ON CONSTRAINT usuario_fk ON portal_seguranca.usuario IS 'Chave estrangeira que referencia o usuário que realizou a exclusão';

-- Comentário para a restrição de chave estrangeira pessoa_fk
COMMENT ON CONSTRAINT pessoa_fk ON portal_seguranca.usuario IS 'Chave estrangeira que referencia a pessoa que o usuário pertence';


CREATE TABLE portal_seguranca.perfil
(
    id     UUID         NOT NULL,
    nome   VARCHAR(255) NOT NULL,
    codigo VARCHAR(50)  NOT NULL,
    CONSTRAINT perfil_pk PRIMARY KEY (id),
    CONSTRAINT perfil_codigo_un UNIQUE (codigo)
);
-- Comentário para a tabela perfil
COMMENT ON TABLE portal_seguranca.perfil IS 'Tabela que armazena informações sobre os perfis de usuários no portal de segurança';

-- Comentários para colunas da tabela perfil
COMMENT ON COLUMN portal_seguranca.perfil.id IS 'Identificador único do perfil (UUID)';
COMMENT ON COLUMN portal_seguranca.perfil.nome IS 'Nome do perfil';
COMMENT ON COLUMN portal_seguranca.perfil.codigo IS 'Código único associado ao perfil';

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
-- Comentário para a tabela modulo
COMMENT ON TABLE portal_seguranca.modulo IS 'Tabela que armazena informações sobre os módulos do sistema no portal de segurança';

-- Comentários para colunas da tabela modulo
COMMENT ON COLUMN portal_seguranca.modulo.id IS 'Identificador único do módulo (UUID)';
COMMENT ON COLUMN portal_seguranca.modulo.nome IS 'Nome do módulo';
COMMENT ON COLUMN portal_seguranca.modulo.codigo IS 'Código único associado ao módulo';
COMMENT ON COLUMN portal_seguranca.modulo.url IS 'URL associada ao módulo';
COMMENT ON COLUMN portal_seguranca.modulo.ativo IS 'Indica se o módulo está ativo ou inativo';

CREATE TABLE portal_seguranca.grupo
(
    id             UUID         NOT NULL,
    nome           VARCHAR(255) NOT NULL,
    codigo         VARCHAR(50)  NOT NULL,
    gera_protocolo BOOLEAN      NOT NULL DEFAULT FALSE,
    CONSTRAINT grupo_pk PRIMARY KEY (id),
    CONSTRAINT grupo_codigo_un UNIQUE (codigo)
);
-- Comentário para a tabela grupo
COMMENT ON TABLE portal_seguranca.grupo IS 'Tabela que armazena informações sobre os grupos de usuários no portal de segurança';

-- Comentários para colunas da tabela grupo
COMMENT ON COLUMN portal_seguranca.grupo.id IS 'Identificador único do grupo (UUID)';
COMMENT ON COLUMN portal_seguranca.grupo.nome IS 'Nome do grupo';
COMMENT ON COLUMN portal_seguranca.grupo.codigo IS 'Código único associado ao grupo';
COMMENT ON COLUMN portal_seguranca.grupo.gera_protocolo IS 'Flag indicativa se o grupo gera protocolo via webservice';

CREATE TABLE portal_seguranca.tela
(
    id        UUID         NOT NULL,
    nome      VARCHAR(255) NOT NULL,
    codigo    VARCHAR(50)  NOT NULL,
    id_modulo uuid         NOT NULL,
    CONSTRAINT tela_pk PRIMARY KEY (id),
    CONSTRAINT tela_codigo_un UNIQUE (codigo),
    CONSTRAINT tela_modulo_fk FOREIGN KEY (id_modulo) REFERENCES portal_seguranca.modulo (id) ON DELETE CASCADE
);
-- Comentário para a tabela tela
COMMENT ON TABLE portal_seguranca.tela IS 'Tabela que armazena informações sobre as telas do sistema no portal de segurança';

-- Comentários para colunas da tabela tela
COMMENT ON COLUMN portal_seguranca.tela.id IS 'Identificador único da tela (UUID)';
COMMENT ON COLUMN portal_seguranca.tela.nome IS 'Nome da tela';
COMMENT ON COLUMN portal_seguranca.tela.codigo IS 'Código único associado à tela';
COMMENT ON COLUMN portal_seguranca.tela.id_modulo IS 'Identificador do módulo ao qual a tela pertence';

-- Comentário para a restrição de chave estrangeira tela_modulo_fk
COMMENT ON CONSTRAINT tela_modulo_fk ON portal_seguranca.tela IS 'Chave estrangeira que referencia o módulo ao qual a tela pertence';

CREATE TABLE portal_seguranca.permissao
(
    codigo    VARCHAR(255) NOT NULL,
    descricao VARCHAR(255) NOT NULL,
    id_tela   UUID         NOT NULL,
    CONSTRAINT permissao_pk PRIMARY KEY (codigo),
    CONSTRAINT permissao_tela_fk FOREIGN KEY (id_tela) REFERENCES portal_seguranca.tela (id)
);
-- Comentário para a tabela permissao
COMMENT ON TABLE portal_seguranca.permissao IS 'Tabela que armazena informações sobre as permissões no portal de segurança';

-- Comentários para colunas da tabela permissao
COMMENT ON COLUMN portal_seguranca.permissao.codigo IS 'Código único associado à permissão';
COMMENT ON COLUMN portal_seguranca.permissao.descricao IS 'Descrição da permissão';

-- Comentário para a restrição de chave estrangeira permissao_tela_fk
COMMENT ON CONSTRAINT permissao_tela_fk ON portal_seguranca.permissao IS 'Chave estrangeira que referencia a tela associada à relação';


CREATE TABLE portal_seguranca.grupo_perfil
(
    id_grupo  UUID NOT NULL,
    id_perfil UUID NOT NULL,
    CONSTRAINT grupo_perfil_pk PRIMARY KEY (id_grupo, id_perfil),
    CONSTRAINT grupo_perfil_grupo_fk FOREIGN KEY (id_grupo) REFERENCES portal_seguranca.grupo (id) ON DELETE CASCADE,
    CONSTRAINT grupo_perfil_perfil_fk FOREIGN KEY (id_perfil) REFERENCES portal_seguranca.perfil (id) ON DELETE CASCADE
);
CREATE INDEX grupo_perfil_idx ON portal_seguranca.grupo_perfil USING btree (id_grupo, id_perfil);

-- Comentário para a tabela grupo_perfil
COMMENT ON TABLE portal_seguranca.grupo_perfil IS 'Tabela que armazena a associação entre grupos e perfis no portal de segurança';

-- Comentários para colunas da tabela grupo_perfil
COMMENT ON COLUMN portal_seguranca.grupo_perfil.id_grupo IS 'Identificador do grupo associado à relação';
COMMENT ON COLUMN portal_seguranca.grupo_perfil.id_perfil IS 'Identificador do perfil associado à relação';

-- Comentário para a restrição de chave primária grupo_perfil_pk
COMMENT ON CONSTRAINT grupo_perfil_pk ON portal_seguranca.grupo_perfil IS 'Chave primária composta pelos identificadores de grupo e perfil';

-- Comentário para a restrição de chave estrangeira grupo_perfil_grupo_fk
COMMENT ON CONSTRAINT grupo_perfil_grupo_fk ON portal_seguranca.grupo_perfil IS 'Chave estrangeira que referencia o grupo associado à relação';

-- Comentário para a restrição de chave estrangeira grupo_perfil_perfil_fk
COMMENT ON CONSTRAINT grupo_perfil_perfil_fk ON portal_seguranca.grupo_perfil IS 'Chave estrangeira que referencia o perfil associado à relação';

-- Comentário para o índice grupo_perfil_idx
COMMENT ON INDEX portal_seguranca.grupo_perfil_idx IS 'Índice composto pelos identificadores de grupo e perfil';


CREATE TABLE portal_seguranca.grupo_modulo
(
    id_grupo  UUID NOT NULL,
    id_modulo UUID NOT NULL,
    CONSTRAINT grupo_modulo_pk PRIMARY KEY (id_grupo, id_modulo),
    CONSTRAINT grupo_modulo_grupo_fk FOREIGN KEY (id_grupo) REFERENCES portal_seguranca.grupo (id) ON DELETE CASCADE,
    CONSTRAINT grupo_modulo_modulo_fk FOREIGN KEY (id_modulo) REFERENCES portal_seguranca.modulo (id) ON DELETE CASCADE
);
CREATE INDEX grupo_modulo_idx ON portal_seguranca.grupo_modulo USING btree (id_grupo, id_modulo);

-- Comentário para a tabela grupo_modulo
COMMENT ON TABLE portal_seguranca.grupo_modulo IS 'Tabela que armazena a associação entre grupos e módulos no portal de segurança';

-- Comentários para colunas da tabela grupo_modulo
COMMENT ON COLUMN portal_seguranca.grupo_modulo.id_grupo IS 'Identificador do grupo associado à relação';
COMMENT ON COLUMN portal_seguranca.grupo_modulo.id_modulo IS 'Identificador do módulo associado à relação';

-- Comentário para a restrição de chave primária grupo_modulo_pk
COMMENT ON CONSTRAINT grupo_modulo_pk ON portal_seguranca.grupo_modulo IS 'Chave primária composta pelos identificadores de grupo e módulo';

-- Comentário para a restrição de chave estrangeira grupo_modulo_grupo_fk
COMMENT ON CONSTRAINT grupo_modulo_grupo_fk ON portal_seguranca.grupo_modulo IS 'Chave estrangeira que referencia o grupo associado à relação';

-- Comentário para a restrição de chave estrangeira grupo_modulo_modulo_fk
COMMENT ON CONSTRAINT grupo_modulo_modulo_fk ON portal_seguranca.grupo_modulo IS 'Chave estrangeira que referencia o módulo associado à relação';

-- Comentário para o índice grupo_modulo_idx
COMMENT ON INDEX portal_seguranca.grupo_modulo_idx IS 'Índice composto pelos identificadores de grupo e módulo';

CREATE TABLE portal_seguranca.grupo_usuario
(
    id_grupo   UUID NOT NULL,
    id_usuario UUID NOT NULL,
    CONSTRAINT grupo_usuario_pk PRIMARY KEY (id_grupo, id_usuario),
    CONSTRAINT grupo_usuario_grupo_fk FOREIGN KEY (id_grupo) REFERENCES portal_seguranca.grupo (id) ON DELETE CASCADE,
    CONSTRAINT grupo_usuario_usuario_fk FOREIGN KEY (id_usuario) REFERENCES portal_seguranca.usuario (id) ON DELETE CASCADE
);
CREATE INDEX grupo_usuario_idx ON portal_seguranca.grupo_usuario USING btree (id_grupo, id_usuario);

-- Comentário para a tabela grupo_usuario
COMMENT ON TABLE portal_seguranca.grupo_usuario IS 'Tabela que armazena a associação entre grupos e usuários no portal de segurança';

-- Comentários para colunas da tabela grupo_usuario
COMMENT ON COLUMN portal_seguranca.grupo_usuario.id_grupo IS 'Identificador do grupo associado à relação';
COMMENT ON COLUMN portal_seguranca.grupo_usuario.id_usuario IS 'Identificador do usuário associado à relação';

-- Comentário para a restrição de chave primária grupo_usuario_pk
COMMENT ON CONSTRAINT grupo_usuario_pk ON portal_seguranca.grupo_usuario IS 'Chave primária composta pelos identificadores de grupo e usuário';

-- Comentário para a restrição de chave estrangeira grupo_usuario_grupo_fk
COMMENT ON CONSTRAINT grupo_usuario_grupo_fk ON portal_seguranca.grupo_usuario IS 'Chave estrangeira que referencia o grupo associado à relação';

-- Comentário para a restrição de chave estrangeira grupo_usuario_usuario_fk
COMMENT ON CONSTRAINT grupo_usuario_usuario_fk ON portal_seguranca.grupo_usuario IS 'Chave estrangeira que referencia o usuário associado à relação';

-- Comentário para o índice grupo_usuario_idx
COMMENT ON INDEX portal_seguranca.grupo_usuario_idx IS 'Índice composto pelos identificadores de grupo e usuário';

CREATE TABLE portal_seguranca.usuario_perfil
(
    id_usuario UUID NOT NULL,
    id_perfil  UUID NOT NULL,
    CONSTRAINT usuario_perfil_pk PRIMARY KEY (id_usuario, id_perfil),
    CONSTRAINT usuario_perfil_usuario_fk FOREIGN KEY (id_usuario) REFERENCES portal_seguranca.usuario (id) ON DELETE CASCADE,
    CONSTRAINT usuario_perfil_perfil_fk FOREIGN KEY (id_perfil) REFERENCES portal_seguranca.perfil (id) ON DELETE CASCADE
);
CREATE INDEX usuario_perfil_idx ON portal_seguranca.usuario_perfil USING btree (id_usuario, id_perfil);

-- Comentário para a tabela usuario_perfil
COMMENT ON TABLE portal_seguranca.usuario_perfil IS 'Tabela que armazena a associação entre usuários e perfis no portal de segurança';

-- Comentários para colunas da tabela usuario_perfil
COMMENT ON COLUMN portal_seguranca.usuario_perfil.id_usuario IS 'Identificador do usuário associado à relação';
COMMENT ON COLUMN portal_seguranca.usuario_perfil.id_perfil IS 'Identificador do perfil associado à relação';

-- Comentário para a restrição de chave primária usuario_perfil_pk
COMMENT ON CONSTRAINT usuario_perfil_pk ON portal_seguranca.usuario_perfil IS 'Chave primária composta pelos identificadores de usuário e perfil';

-- Comentário para a restrição de chave estrangeira usuario_perfil_usuario_fk
COMMENT ON CONSTRAINT usuario_perfil_usuario_fk ON portal_seguranca.usuario_perfil IS 'Chave estrangeira que referencia o usuário associado à relação';

-- Comentário para a restrição de chave estrangeira usuario_perfil_perfil_fk
COMMENT ON CONSTRAINT usuario_perfil_perfil_fk ON portal_seguranca.usuario_perfil IS 'Chave estrangeira que referencia o perfil associado à relação';

-- Comentário para o índice usuario_perfil_idx
COMMENT ON INDEX portal_seguranca.usuario_perfil_idx IS 'Índice composto pelos identificadores de usuário e perfil';


CREATE TABLE portal_seguranca.usuario_perfil_tela_permissao
(
    id_usuario       UUID         NOT NULL,
    id_perfil        UUID         NOT NULL,
    id_tela          UUID         NOT NULL,
    codigo_permissao VARCHAR(255) NOT NULL,
    CONSTRAINT usuario_perfil_tela_permissao_pk PRIMARY KEY (id_usuario, id_perfil, id_tela, codigo_permissao),
    CONSTRAINT usuario_perfil_tela_permissao_usuario_fk FOREIGN KEY (id_usuario) REFERENCES portal_seguranca.usuario (id) ON DELETE CASCADE,
    CONSTRAINT usuario_perfil_tela_permissao_perfil_fk FOREIGN KEY (id_perfil) REFERENCES portal_seguranca.perfil (id) ON DELETE CASCADE,
    CONSTRAINT usuario_perfil_tela_permissao_tela_fk FOREIGN KEY (id_tela) REFERENCES portal_seguranca.tela (id) ON DELETE CASCADE,
    CONSTRAINT usuario_perfil_tela_permissao_acao_fk FOREIGN KEY (codigo_permissao) REFERENCES portal_seguranca.permissao (codigo) ON DELETE CASCADE
);
CREATE INDEX usuario_perfil_tela_permissao_idx ON portal_seguranca.usuario_perfil_tela_permissao USING btree (id_usuario, id_perfil, id_tela, codigo_permissao);

-- Comentário para a tabela usuario_perfil_tela_permissao
COMMENT ON TABLE portal_seguranca.usuario_perfil_tela_permissao IS 'Tabela que armazena a associação entre usuários, perfis, telas e permissões no portal de segurança';

-- Comentários para colunas da tabela usuario_perfil_tela_permissao
COMMENT ON COLUMN portal_seguranca.usuario_perfil_tela_permissao.id_usuario IS 'Identificador do usuário associado à relação';
COMMENT ON COLUMN portal_seguranca.usuario_perfil_tela_permissao.id_perfil IS 'Identificador do perfil associado à relação';
COMMENT ON COLUMN portal_seguranca.usuario_perfil_tela_permissao.id_tela IS 'Identificador da tela associada à relação';
COMMENT ON COLUMN portal_seguranca.usuario_perfil_tela_permissao.codigo_permissao IS 'Código da permissão associada à relação';

-- Comentário para a restrição de chave primária usuario_perfil_tela_permissao_pk
COMMENT ON CONSTRAINT usuario_perfil_tela_permissao_pk ON portal_seguranca.usuario_perfil_tela_permissao IS 'Chave primária composta pelos identificadores de usuário, perfil, tela e permissão';

-- Comentário para a restrição de chave estrangeira usuario_perfil_tela_permissao_usuario_fk
COMMENT ON CONSTRAINT usuario_perfil_tela_permissao_usuario_fk ON portal_seguranca.usuario_perfil_tela_permissao IS 'Chave estrangeira que referencia o usuário associado à relação';

-- Comentário para a restrição de chave estrangeira usuario_perfil_tela_permissao_perfil_fk
COMMENT ON CONSTRAINT usuario_perfil_tela_permissao_perfil_fk ON portal_seguranca.usuario_perfil_tela_permissao IS 'Chave estrangeira que referencia o perfil associado à relação';

-- Comentário para a restrição de chave estrangeira usuario_perfil_tela_permissao_tela_fk
COMMENT ON CONSTRAINT usuario_perfil_tela_permissao_tela_fk ON portal_seguranca.usuario_perfil_tela_permissao IS 'Chave estrangeira que referencia a tela associada à relação';

-- Comentário para a restrição de chave estrangeira usuario_perfil_tela_permissao_acao_fk
COMMENT ON CONSTRAINT usuario_perfil_tela_permissao_acao_fk ON portal_seguranca.usuario_perfil_tela_permissao IS 'Chave estrangeira que referencia a permissão associada à relação';

-- Comentário para o índice usuario_perfil_tela_permissao_idx
COMMENT ON INDEX portal_seguranca.usuario_perfil_tela_permissao_idx IS 'Índice composto pelos identificadores de usuário, perfil, tela e permissão';