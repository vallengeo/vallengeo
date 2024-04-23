INSERT INTO dado_global.camada (nome, codigo, ordem, id_camada_categoria)
VALUES ('Limite Municipal', 'crz22_limite_municipal', 1, (SELECT id FROM dado_global.camada_categoria WHERE codigo = 'LIMITE_MUNICIPAL'));

INSERT INTO dado_global.camada (nome, codigo, ordem, id_camada_categoria)
VALUES ('Setor', 'crz01_setor', 2, (SELECT id FROM dado_global.camada_categoria WHERE codigo = 'SETOR'));

INSERT INTO dado_global.camada (nome, codigo, ordem, id_camada_categoria)
VALUES ('Quadra', 'crz02_quadra', 3, (SELECT id FROM dado_global.camada_categoria WHERE codigo = 'QUADRA'));

INSERT INTO dado_global.camada (nome, codigo, ordem, id_camada_categoria)
VALUES ('Lote', 'crz03_lote', 4, (SELECT id FROM dado_global.camada_categoria WHERE codigo = 'LOTE'));

INSERT INTO dado_global.camada (nome, codigo, ordem, id_camada_categoria)
VALUES ('Trecho Logradouro', 'crz06_trecho_logradouro', 5, (SELECT id FROM dado_global.camada_categoria WHERE codigo = 'TRECHO_LOGRADOURO'));

INSERT INTO dado_global.camada (nome, codigo, ordem, id_camada_categoria)
VALUES ('Edificação', 'crz04_edificacao', 6, (SELECT id FROM dado_global.camada_categoria WHERE codigo = 'EDIFICACAO'));

INSERT INTO dado_global.camada_grupo (id_camada, id_grupo)
VALUES ((SELECT id FROM dado_global.camada WHERE codigo = 'crz22_limite_municipal'),
        (SELECT id FROM portal_seguranca.grupo WHERE codigo = 'CRUZEIRO'));

INSERT INTO dado_global.camada_grupo (id_camada, id_grupo)
VALUES ((SELECT id FROM dado_global.camada WHERE codigo = 'crz01_setor'),
        (SELECT id FROM portal_seguranca.grupo WHERE codigo = 'CRUZEIRO'));

INSERT INTO dado_global.camada_grupo (id_camada, id_grupo)
VALUES ((SELECT id FROM dado_global.camada WHERE codigo = 'crz02_quadra'),
        (SELECT id FROM portal_seguranca.grupo WHERE codigo = 'CRUZEIRO'));

INSERT INTO dado_global.camada_grupo (id_camada, id_grupo)
VALUES ((SELECT id FROM dado_global.camada WHERE codigo = 'crz03_lote'),
        (SELECT id FROM portal_seguranca.grupo WHERE codigo = 'CRUZEIRO'));

INSERT INTO dado_global.camada_grupo (id_camada, id_grupo)
VALUES ((SELECT id FROM dado_global.camada WHERE codigo = 'crz06_trecho_logradouro'),
        (SELECT id FROM portal_seguranca.grupo WHERE codigo = 'CRUZEIRO'));

INSERT INTO dado_global.camada_grupo (id_camada, id_grupo)
VALUES ((SELECT id FROM dado_global.camada WHERE codigo = 'crz04_edificacao'),
        (SELECT id FROM portal_seguranca.grupo WHERE codigo = 'CRUZEIRO'));