INSERT INTO dado_global.camada (nome, codigo, ordem, id_camada_categoria)
VALUES ('Limite Municipal', 'limite_municipal', 1, (SELECT id FROM dado_global.camada_categoria WHERE codigo = 'LIMITE_MUNICIPAL'));

INSERT INTO dado_global.camada (nome, codigo, ordem, id_camada_categoria)
VALUES ('Setor', 'setor', 2, (SELECT id FROM dado_global.camada_categoria WHERE codigo = 'SETOR'));

INSERT INTO dado_global.camada (nome, codigo, ordem, id_camada_categoria)
VALUES ('Quadra', 'quadra', 3, (SELECT id FROM dado_global.camada_categoria WHERE codigo = 'QUADRA'));

INSERT INTO dado_global.camada (nome, codigo, ordem, id_camada_categoria)
VALUES ('Lote', 'lote', 4, (SELECT id FROM dado_global.camada_categoria WHERE codigo = 'LOTE'));

INSERT INTO dado_global.camada (nome, codigo, ordem, id_camada_categoria)
VALUES ('Trecho Logradouro', 'trecho_logradouro', 5, (SELECT id FROM dado_global.camada_categoria WHERE codigo = 'TRECHO_LOGRADOURO'));

INSERT INTO dado_global.camada (nome, codigo, ordem, id_camada_categoria)
VALUES ('Edificação', 'edificacao', 6, (SELECT id FROM dado_global.camada_categoria WHERE codigo = 'EDIFICACAO'));

INSERT INTO dado_global.camada_grupo (id_camada, id_grupo)
VALUES ((SELECT id FROM dado_global.camada WHERE codigo = 'limite_municipal'),
        (SELECT id FROM portal_seguranca.grupo WHERE codigo = 'CRUZEIRO'));

INSERT INTO dado_global.camada_grupo (id_camada, id_grupo)
VALUES ((SELECT id FROM dado_global.camada WHERE codigo = 'setor'),
        (SELECT id FROM portal_seguranca.grupo WHERE codigo = 'CRUZEIRO'));

INSERT INTO dado_global.camada_grupo (id_camada, id_grupo)
VALUES ((SELECT id FROM dado_global.camada WHERE codigo = 'quadra'),
        (SELECT id FROM portal_seguranca.grupo WHERE codigo = 'CRUZEIRO'));

INSERT INTO dado_global.camada_grupo (id_camada, id_grupo)
VALUES ((SELECT id FROM dado_global.camada WHERE codigo = 'lote'),
        (SELECT id FROM portal_seguranca.grupo WHERE codigo = 'CRUZEIRO'));

INSERT INTO dado_global.camada_grupo (id_camada, id_grupo)
VALUES ((SELECT id FROM dado_global.camada WHERE codigo = 'trecho_logradouro'),
        (SELECT id FROM portal_seguranca.grupo WHERE codigo = 'CRUZEIRO'));

INSERT INTO dado_global.camada_grupo (id_camada, id_grupo)
VALUES ((SELECT id FROM dado_global.camada WHERE codigo = 'edificacao'),
        (SELECT id FROM portal_seguranca.grupo WHERE codigo = 'CRUZEIRO'));