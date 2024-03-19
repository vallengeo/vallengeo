-- Inserir tipos de documentos
INSERT INTO cidadao.tipo_documento (id, titulo, formato)
VALUES (NEXTVAL('cidadao.tipo_documento_id_seq'),
        'Habite-se do imóvel',
        '.pdf');

INSERT INTO cidadao.tipo_documento (id, titulo, formato)
VALUES (NEXTVAL('cidadao.tipo_documento_id_seq'),
        'Matrícula',
        '.pdf');

INSERT INTO cidadao.tipo_documento (id, titulo, formato)
VALUES (NEXTVAL('cidadao.tipo_documento_id_seq'),
        'Documento do proprietário (comprima em um arquivo .ZIP)',
        '.zip');

INSERT INTO cidadao.tipo_documento (id, titulo, formato)
VALUES (NEXTVAL('cidadao.tipo_documento_id_seq'),
        'Planta Baixa do empreendimento',
        '.pdf');

INSERT INTO cidadao.tipo_documento (id, titulo, formato)
VALUES (NEXTVAL('cidadao.tipo_documento_id_seq'),
        'Anotação de Responsabilidade Técnica do Empreendimento',
        '.pdf');

INSERT INTO cidadao.tipo_documento (id, titulo, formato)
VALUES (NEXTVAL('cidadao.tipo_documento_id_seq'),
        'Anotação de Responsabilidade Técnica da elaboração do plano de gerenciamento de resíduos',
        '.pdf');

INSERT INTO cidadao.tipo_documento (id, titulo, formato)
VALUES (NEXTVAL('cidadao.tipo_documento_id_seq'),
        'Anotação de Responsabilidade Técnica para estudo de mitigação do efeito atrativo de espécies-problema para aviação',
        '.pdf');

INSERT INTO cidadao.tipo_documento (id, titulo, formato)
VALUES (NEXTVAL('cidadao.tipo_documento_id_seq'),
        'Alvará do Corpo de Bombeiros ou protocolo PPCI',
        '.pdf');

INSERT INTO cidadao.tipo_documento (id, titulo, formato)
VALUES (NEXTVAL('cidadao.tipo_documento_id_seq'),
        'Memorial Descritivo das construções, podendo ser documento que integra ou integrou o processo de licenciamento urbanístico',
        '.pdf');

INSERT INTO cidadao.tipo_documento (id, titulo, formato)
VALUES (NEXTVAL('cidadao.tipo_documento_id_seq'),
        'Plano de ação em caso de acidentes',
        '.pdf');

INSERT INTO cidadao.tipo_documento (id, titulo, formato)
VALUES (NEXTVAL('cidadao.tipo_documento_id_seq'),
        'Imagens do piso impermeabilizado',
        '.zip,.jpeg,.jpg,.png');

-- Relacionamentos entre grupos e tipos de documentos
INSERT INTO cidadao.rel_grupo_tipo_documento (id_grupo, id_tipo_documento, obrigatorio)
VALUES ('4d3c1497-af40-4ddf-8b06-d8f40c8df139',
        (SELECT id FROM cidadao.tipo_documento WHERE titulo = 'Habite-se do imóvel'),
        TRUE);

INSERT INTO cidadao.rel_grupo_tipo_documento (id_grupo, id_tipo_documento, obrigatorio)
VALUES ('4d3c1497-af40-4ddf-8b06-d8f40c8df139',
        (SELECT id FROM cidadao.tipo_documento WHERE titulo = 'Matrícula'),
        TRUE);

INSERT INTO cidadao.rel_grupo_tipo_documento (id_grupo, id_tipo_documento, obrigatorio)
VALUES ('4d3c1497-af40-4ddf-8b06-d8f40c8df139',
        (SELECT id
         FROM cidadao.tipo_documento
         WHERE titulo = 'Documento do proprietário (comprima em um arquivo .ZIP)'),
        TRUE);

INSERT INTO cidadao.rel_grupo_tipo_documento (id_grupo, id_tipo_documento, obrigatorio)
VALUES ('4d3c1497-af40-4ddf-8b06-d8f40c8df139',
        (SELECT id FROM cidadao.tipo_documento WHERE titulo = 'Planta Baixa do empreendimento'),
        TRUE);

INSERT INTO cidadao.rel_grupo_tipo_documento (id_grupo, id_tipo_documento, obrigatorio)
VALUES ('4d3c1497-af40-4ddf-8b06-d8f40c8df139',
        (SELECT id FROM cidadao.tipo_documento WHERE titulo = 'Anotação de Responsabilidade Técnica do Empreendimento'),
        TRUE);

INSERT INTO cidadao.rel_grupo_tipo_documento (id_grupo, id_tipo_documento, obrigatorio)
VALUES ('4d3c1497-af40-4ddf-8b06-d8f40c8df139',
        (SELECT id
         FROM cidadao.tipo_documento
         WHERE titulo = 'Anotação de Responsabilidade Técnica da elaboração do plano de gerenciamento de resíduos'),
        FALSE);

INSERT INTO cidadao.rel_grupo_tipo_documento (id_grupo, id_tipo_documento, obrigatorio)
VALUES ('4d3c1497-af40-4ddf-8b06-d8f40c8df139',
        (SELECT id
         FROM cidadao.tipo_documento
         WHERE titulo =
               'Anotação de Responsabilidade Técnica para estudo de mitigação do efeito atrativo de espécies-problema para aviação'),
        FALSE);

INSERT INTO cidadao.rel_grupo_tipo_documento (id_grupo, id_tipo_documento, obrigatorio)
VALUES ('4d3c1497-af40-4ddf-8b06-d8f40c8df139',
        (SELECT id FROM cidadao.tipo_documento WHERE titulo = 'Alvará do Corpo de Bombeiros ou protocolo PPCI'),
        FALSE);

INSERT INTO cidadao.rel_grupo_tipo_documento (id_grupo, id_tipo_documento, obrigatorio)
VALUES ('4d3c1497-af40-4ddf-8b06-d8f40c8df139',
        (SELECT id
         FROM cidadao.tipo_documento
         WHERE titulo =
               'Memorial Descritivo das construções, podendo ser documento que integra ou integrou o processo de licenciamento urbanístico'),
        FALSE);

INSERT INTO cidadao.rel_grupo_tipo_documento (id_grupo, id_tipo_documento, obrigatorio)
VALUES ('4d3c1497-af40-4ddf-8b06-d8f40c8df139',
        (SELECT id FROM cidadao.tipo_documento WHERE titulo = 'Plano de ação em caso de acidentes'),
        TRUE);

INSERT INTO cidadao.rel_grupo_tipo_documento (id_grupo, id_tipo_documento, obrigatorio)
VALUES ('4d3c1497-af40-4ddf-8b06-d8f40c8df139',
        (SELECT id FROM cidadao.tipo_documento WHERE titulo = 'Imagens do piso impermeabilizado'),
        FALSE);

INSERT INTO cidadao.rel_grupo_tipo_documento (id_grupo, id_tipo_documento, obrigatorio)
VALUES ('4d3c1497-af40-4ddf-8b06-d8f40c8df139',
        (SELECT id FROM cidadao.tipo_documento WHERE titulo = 'Outros documentos'),
        FALSE);