-- ************************* USUARIO ************************************************************************************************************
INSERT INTO portal_seguranca.usuario
(id, email, senha_hash, data_cadastro, data_atualizacao, ativo, codigo_acesso, validade_codigo)
VALUES ('99b551f8-f532-40a0-b63f-094661844bd8', 'email@email.com', 'bb9d3767edcf260dfdd1eaad7cea5b8f', NOW(), NULL,
        TRUE, '204567', CURRENT_TIMESTAMP + (20 || ' minutes')::interval);

-- ************************* GRUPO ************************************************************************************************************
INSERT INTO portal_seguranca.grupo
    (id, nome, codigo)
VALUES ('4d3c1497-af40-4ddf-8b06-d8f40c8df139', 'Taubaté', 'TAUBATE');

-- ************************* PERFIL ************************************************************************************************************
INSERT INTO portal_seguranca.perfil
    (id, nome, codigo)
VALUES ('d66df945-104d-4412-a1ee-0d0659bf86b5', 'Administrador', 'ADMINISTRADOR');

-- ************************* RELACAO USUARIO GRUPO PERFIL ************************************************************************************************************
INSERT INTO portal_seguranca.usuario_grupo_perfil
    (id_usuario, id_grupo, id_perfil)
VALUES ('99b551f8-f532-40a0-b63f-094661844bd8', '4d3c1497-af40-4ddf-8b06-d8f40c8df139',
        'd66df945-104d-4412-a1ee-0d0659bf86b5');

-- ************************* RELACAO GRUPO PERFIL ************************************************************************************************************
INSERT INTO portal_seguranca.grupo_perfil
    (id_grupo, id_perfil)
VALUES ('4d3c1497-af40-4ddf-8b06-d8f40c8df139', 'd66df945-104d-4412-a1ee-0d0659bf86b5');

-- ************************* PERMISSAO ************************************************************************************************************
INSERT INTO portal_seguranca.permissao (id, nome, codigo)
VALUES (gen_random_uuid(), 'Inserir', 'INSERIR');

INSERT INTO portal_seguranca.permissao (id, nome, codigo)
VALUES (gen_random_uuid(), 'Editar', 'EDITAR');

INSERT INTO portal_seguranca.permissao (id, nome, codigo)
VALUES (gen_random_uuid(), 'Remover', 'REMOVER');

INSERT INTO portal_seguranca.permissao (id, nome, codigo)
VALUES (gen_random_uuid(), 'Visualizar', 'VISUALIZAR');

-- ************************* TELA ************************************************************************************************************
INSERT INTO portal_seguranca.tela (id, nome, codigo)
VALUES (gen_random_uuid(), 'Home', 'HOME');

INSERT INTO portal_seguranca.tela (id, nome, codigo)
VALUES (gen_random_uuid(), 'Imóvel', 'IMOVEL');

INSERT INTO portal_seguranca.tela (id, nome, codigo)
VALUES (gen_random_uuid(), 'Protocolo', 'PROTOCOLO');

INSERT INTO portal_seguranca.tela (id, nome, codigo)
VALUES (gen_random_uuid(), 'Relatório', 'RELATORIO');

-- ************************* MODULO ************************************************************************************************************
INSERT INTO portal_seguranca.modulo (id, nome, codigo, url, ativo)
VALUES (gen_random_uuid(), 'Prefeituras', 'PREFEITURA', 'https://www.vallengeo.com.br/prefeituras', TRUE);

-- ************************* RELACAO GRUPO PERFIL TELA PERMISSAO ************************************************************************************************************
INSERT INTO portal_seguranca.grupo_perfil_tela_permissao (id_grupo, id_perfil, id_tela, id_permissao)
VALUES ((SELECT id FROM portal_seguranca.grupo WHERE codigo = 'TAUBATE'),
        (SELECT id FROM portal_seguranca.perfil WHERE codigo = 'ADMINISTRADOR'),
        (SELECT id FROM portal_seguranca.tela WHERE codigo = 'HOME'),
        (SELECT id FROM portal_seguranca.permissao WHERE codigo = 'INSERIR'));

INSERT INTO portal_seguranca.grupo_perfil_tela_permissao (id_grupo, id_perfil, id_tela, id_permissao)
VALUES ((SELECT id FROM portal_seguranca.grupo WHERE codigo = 'TAUBATE'),
        (SELECT id FROM portal_seguranca.perfil WHERE codigo = 'ADMINISTRADOR'),
        (SELECT id FROM portal_seguranca.tela WHERE codigo = 'HOME'),
        (SELECT id FROM portal_seguranca.permissao WHERE codigo = 'EDITAR'));

INSERT INTO portal_seguranca.grupo_perfil_tela_permissao (id_grupo, id_perfil, id_tela, id_permissao)
VALUES ((SELECT id FROM portal_seguranca.grupo WHERE codigo = 'TAUBATE'),
        (SELECT id FROM portal_seguranca.perfil WHERE codigo = 'ADMINISTRADOR'),
        (SELECT id FROM portal_seguranca.tela WHERE codigo = 'HOME'),
        (SELECT id FROM portal_seguranca.permissao WHERE codigo = 'REMOVER'));

INSERT INTO portal_seguranca.grupo_perfil_tela_permissao (id_grupo, id_perfil, id_tela, id_permissao)
VALUES ((SELECT id FROM portal_seguranca.grupo WHERE codigo = 'TAUBATE'),
        (SELECT id FROM portal_seguranca.perfil WHERE codigo = 'ADMINISTRADOR'),
        (SELECT id FROM portal_seguranca.tela WHERE codigo = 'HOME'),
        (SELECT id FROM portal_seguranca.permissao WHERE codigo = 'VISUALIZAR'));

INSERT INTO portal_seguranca.grupo_perfil_tela_permissao (id_grupo, id_perfil, id_tela, id_permissao)
VALUES ((SELECT id FROM portal_seguranca.grupo WHERE codigo = 'TAUBATE'),
        (SELECT id FROM portal_seguranca.perfil WHERE codigo = 'ADMINISTRADOR'),
        (SELECT id FROM portal_seguranca.tela WHERE codigo = 'IMOVEL'),
        (SELECT id FROM portal_seguranca.permissao WHERE codigo = 'INSERIR'));

INSERT INTO portal_seguranca.grupo_perfil_tela_permissao (id_grupo, id_perfil, id_tela, id_permissao)
VALUES ((SELECT id FROM portal_seguranca.grupo WHERE codigo = 'TAUBATE'),
        (SELECT id FROM portal_seguranca.perfil WHERE codigo = 'ADMINISTRADOR'),
        (SELECT id FROM portal_seguranca.tela WHERE codigo = 'IMOVEL'),
        (SELECT id FROM portal_seguranca.permissao WHERE codigo = 'EDITAR'));

INSERT INTO portal_seguranca.grupo_perfil_tela_permissao (id_grupo, id_perfil, id_tela, id_permissao)
VALUES ((SELECT id FROM portal_seguranca.grupo WHERE codigo = 'TAUBATE'),
        (SELECT id FROM portal_seguranca.perfil WHERE codigo = 'ADMINISTRADOR'),
        (SELECT id FROM portal_seguranca.tela WHERE codigo = 'IMOVEL'),
        (SELECT id FROM portal_seguranca.permissao WHERE codigo = 'REMOVER'));

INSERT INTO portal_seguranca.grupo_perfil_tela_permissao (id_grupo, id_perfil, id_tela, id_permissao)
VALUES ((SELECT id FROM portal_seguranca.grupo WHERE codigo = 'TAUBATE'),
        (SELECT id FROM portal_seguranca.perfil WHERE codigo = 'ADMINISTRADOR'),
        (SELECT id FROM portal_seguranca.tela WHERE codigo = 'IMOVEL'),
        (SELECT id FROM portal_seguranca.permissao WHERE codigo = 'VISUALIZAR'));

INSERT INTO portal_seguranca.grupo_perfil_tela_permissao (id_grupo, id_perfil, id_tela, id_permissao)
VALUES ((SELECT id FROM portal_seguranca.grupo WHERE codigo = 'TAUBATE'),
        (SELECT id FROM portal_seguranca.perfil WHERE codigo = 'ADMINISTRADOR'),
        (SELECT id FROM portal_seguranca.tela WHERE codigo = 'PROTOCOLO'),
        (SELECT id FROM portal_seguranca.permissao WHERE codigo = 'INSERIR'));

INSERT INTO portal_seguranca.grupo_perfil_tela_permissao (id_grupo, id_perfil, id_tela, id_permissao)
VALUES ((SELECT id FROM portal_seguranca.grupo WHERE codigo = 'TAUBATE'),
        (SELECT id FROM portal_seguranca.perfil WHERE codigo = 'ADMINISTRADOR'),
        (SELECT id FROM portal_seguranca.tela WHERE codigo = 'PROTOCOLO'),
        (SELECT id FROM portal_seguranca.permissao WHERE codigo = 'EDITAR'));

INSERT INTO portal_seguranca.grupo_perfil_tela_permissao (id_grupo, id_perfil, id_tela, id_permissao)
VALUES ((SELECT id FROM portal_seguranca.grupo WHERE codigo = 'TAUBATE'),
        (SELECT id FROM portal_seguranca.perfil WHERE codigo = 'ADMINISTRADOR'),
        (SELECT id FROM portal_seguranca.tela WHERE codigo = 'PROTOCOLO'),
        (SELECT id FROM portal_seguranca.permissao WHERE codigo = 'REMOVER'));

INSERT INTO portal_seguranca.grupo_perfil_tela_permissao (id_grupo, id_perfil, id_tela, id_permissao)
VALUES ((SELECT id FROM portal_seguranca.grupo WHERE codigo = 'TAUBATE'),
        (SELECT id FROM portal_seguranca.perfil WHERE codigo = 'ADMINISTRADOR'),
        (SELECT id FROM portal_seguranca.tela WHERE codigo = 'PROTOCOLO'),
        (SELECT id FROM portal_seguranca.permissao WHERE codigo = 'VISUALIZAR'));

INSERT INTO portal_seguranca.grupo_perfil_tela_permissao (id_grupo, id_perfil, id_tela, id_permissao)
VALUES ((SELECT id FROM portal_seguranca.grupo WHERE codigo = 'TAUBATE'),
        (SELECT id FROM portal_seguranca.perfil WHERE codigo = 'ADMINISTRADOR'),
        (SELECT id FROM portal_seguranca.tela WHERE codigo = 'RELATORIO'),
        (SELECT id FROM portal_seguranca.permissao WHERE codigo = 'INSERIR'));

INSERT INTO portal_seguranca.grupo_perfil_tela_permissao (id_grupo, id_perfil, id_tela, id_permissao)
VALUES ((SELECT id FROM portal_seguranca.grupo WHERE codigo = 'TAUBATE'),
        (SELECT id FROM portal_seguranca.perfil WHERE codigo = 'ADMINISTRADOR'),
        (SELECT id FROM portal_seguranca.tela WHERE codigo = 'RELATORIO'),
        (SELECT id FROM portal_seguranca.permissao WHERE codigo = 'EDITAR'));

INSERT INTO portal_seguranca.grupo_perfil_tela_permissao (id_grupo, id_perfil, id_tela, id_permissao)
VALUES ((SELECT id FROM portal_seguranca.grupo WHERE codigo = 'TAUBATE'),
        (SELECT id FROM portal_seguranca.perfil WHERE codigo = 'ADMINISTRADOR'),
        (SELECT id FROM portal_seguranca.tela WHERE codigo = 'RELATORIO'),
        (SELECT id FROM portal_seguranca.permissao WHERE codigo = 'REMOVER'));

INSERT INTO portal_seguranca.grupo_perfil_tela_permissao (id_grupo, id_perfil, id_tela, id_permissao)
VALUES ((SELECT id FROM portal_seguranca.grupo WHERE codigo = 'TAUBATE'),
        (SELECT id FROM portal_seguranca.perfil WHERE codigo = 'ADMINISTRADOR'),
        (SELECT id FROM portal_seguranca.tela WHERE codigo = 'RELATORIO'),
        (SELECT id FROM portal_seguranca.permissao WHERE codigo = 'VISUALIZAR'));

-- ************************* RELACAO GRUPO MODULO ************************************************************************************************************
INSERT INTO portal_seguranca.grupo_modulo (id_grupo, id_modulo)
VALUES ((SELECT id FROM portal_seguranca.grupo WHERE codigo = 'TAUBATE'),
        (SELECT id FROM portal_seguranca.modulo WHERE codigo = 'PREFEITURA'));

INSERT INTO portal_seguranca.modulo_tela (id_modulo, id_tela)
VALUES ((SELECT id FROM portal_seguranca.modulo WHERE codigo = 'PREFEITURA'),
        (SELECT id FROM portal_seguranca.tela WHERE codigo = 'HOME'));

INSERT INTO portal_seguranca.modulo_tela (id_modulo, id_tela)
VALUES ((SELECT id FROM portal_seguranca.modulo WHERE codigo = 'PREFEITURA'),
        (SELECT id FROM portal_seguranca.tela WHERE codigo = 'IMOVEL'));

INSERT INTO portal_seguranca.modulo_tela (id_modulo, id_tela)
VALUES ((SELECT id FROM portal_seguranca.modulo WHERE codigo = 'PREFEITURA'),
        (SELECT id FROM portal_seguranca.tela WHERE codigo = 'PROTOCOLO'));

INSERT INTO portal_seguranca.modulo_tela (id_modulo, id_tela)
VALUES ((SELECT id FROM portal_seguranca.modulo WHERE codigo = 'PREFEITURA'),
        (SELECT id FROM portal_seguranca.tela WHERE codigo = 'RELATORIO'));
