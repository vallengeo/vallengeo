-- ************************* USUARIO ***********************************
INSERT INTO portal_seguranca.usuario
    (id, email, senha_hash, data_cadastro, data_atualizacao, ativo)
VALUES ('99b551f8-f532-40a0-b63f-094661844bd8', 'vallengeo.dev@gmail.com',
        '$2a$10$dT7kf2bujTwQyRJSLjOwfuKDmTssM99wquQTdujc8GBdvQUgjySFS', NOW(), NULL,
        TRUE);

INSERT INTO portal_seguranca.usuario
    (id, email, senha_hash, data_cadastro, data_atualizacao, ativo)
VALUES ('5c51b22c-4b51-44fd-932b-505a9428f4ca', 'vallengeo.analista@gmail.com',
        '$2a$10$dT7kf2bujTwQyRJSLjOwfuKDmTssM99wquQTdujc8GBdvQUgjySFS', NOW(), NULL,
        TRUE);

INSERT INTO portal_seguranca.usuario
    (id, email, senha_hash, data_cadastro, data_atualizacao, ativo)
VALUES ('f34bd4aa-94a3-4df4-9c1e-fcbe7c714185', 'vallengeo.cidadao@gmail.com',
        '$2a$10$dT7kf2bujTwQyRJSLjOwfuKDmTssM99wquQTdujc8GBdvQUgjySFS', NOW(), NULL,
        TRUE);

-- ************************* GRUPO ***********************************
INSERT INTO portal_seguranca.grupo
    (id, nome, codigo)
VALUES ('4d3c1497-af40-4ddf-8b06-d8f40c8df139', 'Cruzeiro', 'CRUZEIRO');

-- ************************* PERFIL ************************************************************************
INSERT INTO portal_seguranca.perfil
    (id, nome, codigo)
VALUES ('d66df945-104d-4412-a1ee-0d0659bf86b5', 'Administrador', 'ADMINISTRADOR');

INSERT INTO portal_seguranca.perfil
    (id, nome, codigo)
VALUES ('aae3d727-2f2c-4539-a2a0-0ce34ecf5529', 'Analista', 'ANALISTA');

INSERT INTO portal_seguranca.perfil
    (id, nome, codigo)
VALUES ('8abc3181-d4d9-40ab-8477-5202074afae3', 'Cidadão', 'CIDADAO');

-- ************************* RELACAO USUARIO PERFIL ************************************************************************
INSERT INTO portal_seguranca.usuario_perfil
    (id_usuario, id_perfil)
VALUES ('99b551f8-f532-40a0-b63f-094661844bd8', 'd66df945-104d-4412-a1ee-0d0659bf86b5');

INSERT INTO portal_seguranca.usuario_perfil
    (id_usuario, id_perfil)
VALUES ('5c51b22c-4b51-44fd-932b-505a9428f4ca', 'aae3d727-2f2c-4539-a2a0-0ce34ecf5529');

INSERT INTO portal_seguranca.usuario_perfil
    (id_usuario, id_perfil)
VALUES ('f34bd4aa-94a3-4df4-9c1e-fcbe7c714185', '8abc3181-d4d9-40ab-8477-5202074afae3');

-- ************************* RELACAO GRUPO PERFIL ************************************************************************
INSERT INTO portal_seguranca.grupo_perfil
    (id_grupo, id_perfil)
VALUES ('4d3c1497-af40-4ddf-8b06-d8f40c8df139', 'd66df945-104d-4412-a1ee-0d0659bf86b5');

-- ************************* MODULO ************************************************************************
INSERT INTO portal_seguranca.modulo (id, nome, codigo, url, ativo)
VALUES (gen_random_uuid(), 'Prefeituras', 'PREFEITURA', 'https://www.vallengeo.com.br/prefeituras', TRUE);

INSERT INTO portal_seguranca.modulo (id, nome, codigo, url, ativo)
VALUES (gen_random_uuid(), 'Cidadão', 'CIDADAO', 'https://www.vallengeo.com.br/cidadao', TRUE);

-- ************************* TELA ************************************************************************
INSERT INTO portal_seguranca.tela (id, nome, codigo, id_modulo)
VALUES (gen_random_uuid(), 'Home', 'HOME', (SELECT id FROM portal_seguranca.modulo WHERE codigo = 'PREFEITURA'));

INSERT INTO portal_seguranca.tela (id, nome, codigo, id_modulo)
VALUES (gen_random_uuid(), 'Imóvel', 'IMOVEL', (SELECT id FROM portal_seguranca.modulo WHERE codigo = 'PREFEITURA'));

INSERT INTO portal_seguranca.tela (id, nome, codigo, id_modulo)
VALUES (gen_random_uuid(), 'Protocolo', 'PROTOCOLO',
        (SELECT id FROM portal_seguranca.modulo WHERE codigo = 'PREFEITURA'));

INSERT INTO portal_seguranca.tela (id, nome, codigo, id_modulo)
VALUES (gen_random_uuid(), 'Relatório', 'RELATORIO',
        (SELECT id FROM portal_seguranca.modulo WHERE codigo = 'PREFEITURA'));

-- ************************* RELACAO GRUPO MODULO ************************************************************************
INSERT INTO portal_seguranca.grupo_modulo (id_grupo, id_modulo)
VALUES ((SELECT id FROM portal_seguranca.grupo WHERE codigo = 'CRUZEIRO'),
        (SELECT id FROM portal_seguranca.modulo WHERE codigo = 'PREFEITURA'));

INSERT INTO portal_seguranca.grupo_modulo (id_grupo, id_modulo)
VALUES ((SELECT id FROM portal_seguranca.grupo WHERE codigo = 'CRUZEIRO'),
        (SELECT id FROM portal_seguranca.modulo WHERE codigo = 'CIDADAO'));

-- ************************* RELACAO GRUPO USUARIO ************************************************************************
INSERT INTO portal_seguranca.grupo_usuario (id_grupo, id_usuario)
VALUES ((SELECT id FROM portal_seguranca.grupo WHERE codigo = 'CRUZEIRO'), '99b551f8-f532-40a0-b63f-094661844bd8');

-- ************************* PERMISSAO ************************************************************************
-- HOME
INSERT INTO portal_seguranca.permissao (codigo, descricao, id_tela)
VALUES ('HOME_ULTIMO_PROCESSO_VISUALIZAR', 'Visualizar últimos processos na tela home',
        (SELECT id FROM portal_seguranca.tela WHERE codigo = 'HOME'));

INSERT INTO portal_seguranca.permissao (codigo, descricao, id_tela)
VALUES ('HOME_ATUALIZACAO_PROCESSO_VISUALIZAR', 'Visualizar histórico de atualizações de processos na tela home',
        (SELECT id FROM portal_seguranca.tela WHERE codigo = 'HOME'));

INSERT INTO portal_seguranca.permissao (codigo, descricao, id_tela)
VALUES ('HOME_RESUMO_IMOVEL_VISUALIZAR', 'Visualizar resumo de imóveis na tela home',
        (SELECT id FROM portal_seguranca.tela WHERE codigo = 'HOME'));

INSERT INTO portal_seguranca.permissao (codigo, descricao, id_tela)
VALUES ('HOME_RESUMO_IMOVEL_EDITAR', 'Editar resumo de imóveis na tela home',
        (SELECT id FROM portal_seguranca.tela WHERE codigo = 'HOME'));

INSERT INTO portal_seguranca.permissao (codigo, descricao, id_tela)
VALUES ('HOME_RESUMO_IMOVEL_DOWNLOAD', 'Realizar download do resumo de imóveis na tela home',
        (SELECT id FROM portal_seguranca.tela WHERE codigo = 'HOME'));

INSERT INTO portal_seguranca.permissao (codigo, descricao, id_tela)
VALUES ('HOME_RESUMO_IMOVEL_ARQUIVAR', 'Arquivar resumo de imóveis na tela home',
        (SELECT id FROM portal_seguranca.tela WHERE codigo = 'HOME'));

-- IMOVEL
INSERT INTO portal_seguranca.permissao (codigo, descricao, id_tela)
VALUES ('IMOVEL_CADASTRAR', 'Cadastrar novo imóvel', (SELECT id FROM portal_seguranca.tela WHERE codigo = 'IMOVEL'));

INSERT INTO portal_seguranca.permissao (codigo, descricao, id_tela)
VALUES ('IMOVEL_LISTA_IMOVEL_VISUALIZAR', 'Visualizar o imóvel na tela imóvel',
        (SELECT id FROM portal_seguranca.tela WHERE codigo = 'IMOVEL'));

INSERT INTO portal_seguranca.permissao (codigo, descricao, id_tela)
VALUES ('IMOVEL_LISTA_IMOVEL_RELATORIO', 'Visualizar o relatório do imóvel na tela imóvel',
        (SELECT id FROM portal_seguranca.tela WHERE codigo = 'IMOVEL'));

INSERT INTO portal_seguranca.permissao (codigo, descricao, id_tela)
VALUES ('IMOVEL_LISTA_IMOVEL_ARQUIVAR', 'Arquivar o imóvel na tela imóvel',
        (SELECT id FROM portal_seguranca.tela WHERE codigo = 'IMOVEL'));

-- PROTOCOLO
INSERT INTO portal_seguranca.permissao (codigo, descricao, id_tela)
VALUES ('PROTOCOLO_LISTA_PROCESSO_VISUALIZAR', 'Visualizar o processo na tela processo',
        (SELECT id FROM portal_seguranca.tela WHERE codigo = 'PROTOCOLO'));

INSERT INTO portal_seguranca.permissao (codigo, descricao, id_tela)
VALUES ('PROTOCOLO_LISTA_PROCESSO_RELATORIO', 'Visualizar o relatório do processo na tela processo',
        (SELECT id FROM portal_seguranca.tela WHERE codigo = 'PROTOCOLO'));

INSERT INTO portal_seguranca.permissao (codigo, descricao, id_tela)
VALUES ('PROTOCOLO_LISTA_PROCESSO_ARQUIVAR', 'Arquivar o processo na tela processo',
        (SELECT id FROM portal_seguranca.tela WHERE codigo = 'PROTOCOLO'));

-- RELATORIO
INSERT INTO portal_seguranca.permissao (codigo, descricao, id_tela)
VALUES ('RELATORIO_GERAR', 'Gerar o relatório na tela relatório',
        (SELECT id FROM portal_seguranca.tela WHERE codigo = 'RELATORIO'));

INSERT INTO portal_seguranca.permissao (codigo, descricao, id_tela)
VALUES ('RELATORIO_RESUMO_IMOVEL_DOWNLOAD', 'Realizar download do resumo de imóveis na tela relatório',
        (SELECT id FROM portal_seguranca.tela WHERE codigo = 'RELATORIO'));

-- ************************* RELACAO USUARIO PERFIL TELA PERMISSAO **************************************************
-- HOME
INSERT INTO portal_seguranca.usuario_perfil_tela_permissao (id_usuario, id_perfil, id_tela, codigo_permissao)
VALUES ('99b551f8-f532-40a0-b63f-094661844bd8', 'd66df945-104d-4412-a1ee-0d0659bf86b5',
        (SELECT id FROM portal_seguranca.tela WHERE codigo = 'HOME'), 'HOME_ULTIMO_PROCESSO_VISUALIZAR');

INSERT INTO portal_seguranca.usuario_perfil_tela_permissao (id_usuario, id_perfil, id_tela, codigo_permissao)
VALUES ('99b551f8-f532-40a0-b63f-094661844bd8', 'd66df945-104d-4412-a1ee-0d0659bf86b5',
        (SELECT id FROM portal_seguranca.tela WHERE codigo = 'HOME'), 'HOME_ATUALIZACAO_PROCESSO_VISUALIZAR');

INSERT INTO portal_seguranca.usuario_perfil_tela_permissao (id_usuario, id_perfil, id_tela, codigo_permissao)
VALUES ('99b551f8-f532-40a0-b63f-094661844bd8', 'd66df945-104d-4412-a1ee-0d0659bf86b5',
        (SELECT id FROM portal_seguranca.tela WHERE codigo = 'HOME'), 'HOME_RESUMO_IMOVEL_VISUALIZAR');

INSERT INTO portal_seguranca.usuario_perfil_tela_permissao (id_usuario, id_perfil, id_tela, codigo_permissao)
VALUES ('99b551f8-f532-40a0-b63f-094661844bd8', 'd66df945-104d-4412-a1ee-0d0659bf86b5',
        (SELECT id FROM portal_seguranca.tela WHERE codigo = 'HOME'), 'HOME_RESUMO_IMOVEL_EDITAR');

INSERT INTO portal_seguranca.usuario_perfil_tela_permissao (id_usuario, id_perfil, id_tela, codigo_permissao)
VALUES ('99b551f8-f532-40a0-b63f-094661844bd8', 'd66df945-104d-4412-a1ee-0d0659bf86b5',
        (SELECT id FROM portal_seguranca.tela WHERE codigo = 'HOME'), 'HOME_RESUMO_IMOVEL_DOWNLOAD');

INSERT INTO portal_seguranca.usuario_perfil_tela_permissao (id_usuario, id_perfil, id_tela, codigo_permissao)
VALUES ('99b551f8-f532-40a0-b63f-094661844bd8', 'd66df945-104d-4412-a1ee-0d0659bf86b5',
        (SELECT id FROM portal_seguranca.tela WHERE codigo = 'HOME'), 'HOME_RESUMO_IMOVEL_ARQUIVAR');

-- IMOVEL
INSERT INTO portal_seguranca.usuario_perfil_tela_permissao (id_usuario, id_perfil, id_tela, codigo_permissao)
VALUES ('99b551f8-f532-40a0-b63f-094661844bd8', 'd66df945-104d-4412-a1ee-0d0659bf86b5',
        (SELECT id FROM portal_seguranca.tela WHERE codigo = 'IMOVEL'), 'IMOVEL_CADASTRAR');

INSERT INTO portal_seguranca.usuario_perfil_tela_permissao (id_usuario, id_perfil, id_tela, codigo_permissao)
VALUES ('99b551f8-f532-40a0-b63f-094661844bd8', 'd66df945-104d-4412-a1ee-0d0659bf86b5',
        (SELECT id FROM portal_seguranca.tela WHERE codigo = 'IMOVEL'), 'IMOVEL_LISTA_IMOVEL_VISUALIZAR');

INSERT INTO portal_seguranca.usuario_perfil_tela_permissao (id_usuario, id_perfil, id_tela, codigo_permissao)
VALUES ('99b551f8-f532-40a0-b63f-094661844bd8', 'd66df945-104d-4412-a1ee-0d0659bf86b5',
        (SELECT id FROM portal_seguranca.tela WHERE codigo = 'IMOVEL'), 'IMOVEL_LISTA_IMOVEL_RELATORIO');

INSERT INTO portal_seguranca.usuario_perfil_tela_permissao (id_usuario, id_perfil, id_tela, codigo_permissao)
VALUES ('99b551f8-f532-40a0-b63f-094661844bd8', 'd66df945-104d-4412-a1ee-0d0659bf86b5',
        (SELECT id FROM portal_seguranca.tela WHERE codigo = 'IMOVEL'), 'IMOVEL_LISTA_IMOVEL_ARQUIVAR');

-- PROTOCOLO
INSERT INTO portal_seguranca.usuario_perfil_tela_permissao (id_usuario, id_perfil, id_tela, codigo_permissao)
VALUES ('99b551f8-f532-40a0-b63f-094661844bd8', 'd66df945-104d-4412-a1ee-0d0659bf86b5',
        (SELECT id FROM portal_seguranca.tela WHERE codigo = 'PROTOCOLO'), 'PROTOCOLO_LISTA_PROCESSO_VISUALIZAR');

INSERT INTO portal_seguranca.usuario_perfil_tela_permissao (id_usuario, id_perfil, id_tela, codigo_permissao)
VALUES ('99b551f8-f532-40a0-b63f-094661844bd8', 'd66df945-104d-4412-a1ee-0d0659bf86b5',
        (SELECT id FROM portal_seguranca.tela WHERE codigo = 'PROTOCOLO'), 'PROTOCOLO_LISTA_PROCESSO_RELATORIO');

INSERT INTO portal_seguranca.usuario_perfil_tela_permissao (id_usuario, id_perfil, id_tela, codigo_permissao)
VALUES ('99b551f8-f532-40a0-b63f-094661844bd8', 'd66df945-104d-4412-a1ee-0d0659bf86b5',
        (SELECT id FROM portal_seguranca.tela WHERE codigo = 'PROTOCOLO'), 'PROTOCOLO_LISTA_PROCESSO_ARQUIVAR');

-- RELATORIO
INSERT INTO portal_seguranca.usuario_perfil_tela_permissao (id_usuario, id_perfil, id_tela, codigo_permissao)
VALUES ('99b551f8-f532-40a0-b63f-094661844bd8', 'd66df945-104d-4412-a1ee-0d0659bf86b5',
        (SELECT id FROM portal_seguranca.tela WHERE codigo = 'RELATORIO'), 'RELATORIO_GERAR');

INSERT INTO portal_seguranca.usuario_perfil_tela_permissao (id_usuario, id_perfil, id_tela, codigo_permissao)
VALUES ('99b551f8-f532-40a0-b63f-094661844bd8', 'd66df945-104d-4412-a1ee-0d0659bf86b5',
        (SELECT id FROM portal_seguranca.tela WHERE codigo = 'RELATORIO'), 'RELATORIO_RESUMO_IMOVEL_DOWNLOAD');