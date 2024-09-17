create table cidadao.notificacao (
	id int8 GENERATED BY DEFAULT AS IDENTITY,
	id_imovel int4 NOT NULL,
	data_cadastro timestamp NOT NULL DEFAULT NOW(),
	CONSTRAINT notificacao_pk PRIMARY KEY (id),
	CONSTRAINT fk_imovel FOREIGN KEY (id_imovel) REFERENCES cidadao.imovel ON delete CASCADE
);

-- Comentário para a tabela
comment on table cidadao.notificacao is 'Tabela para armazenar notificações associadas a imóveis e grupos de segurança.';

-- Comentários para as colunas
comment on column cidadao.notificacao.id is 'Identificador único da notificação.';
comment on column cidadao.notificacao.id_imovel is 'Identificador do imóvel relacionado à notificação.';
comment on column cidadao.notificacao.data_cadastro is 'Data e hora em que a notificação foi cadastrada, com valor padrão como a data e hora atuais.';

-- Comentários para as restrições
comment on CONSTRAINT notificacao_pk ON cidadao.notificacao is 'Chave primária da tabela de notificações.';
comment on CONSTRAINT fk_imovel ON cidadao.notificacao is 'Chave estrangeira referenciando o imóvel, com exclusão em cascata.';