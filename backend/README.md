# Backend API VallenGeo

Desenvolvimento da Plataforma de Serviços da VallenGeo

## Tecnologias necessárias

- Java 17.x
- PostgreSQL 14
- Docker 20.10.6 (a instalação muda dependendo do SO)
- Docker compose v1.26.0 [how to install](https://docs.docker.com/compose/install/)
- Maven 3.9.x
  - [Update to maven-3.9.x](https://github.com/m-thirumal/installation_guide/blob/master/maven/upgrade_maven.md)

## Configuração de ambiente

### Banco de dados

Dentro do diretório `./docker/vallengeo`, executar: 
```sh
filename=.env
cat > $filename << EOF
# DATABASE
POSTGRES_DB=vallengeo
POSTGRES_DB_DOCKER_PORT=5432
POSTGRES_DB_LOCAL_PORT=5432
DATABASE_URL=jdbc:postgresql://localhost:${DATABASE_PORT}/${POSTGRES_DB}
POSTGRES_USER=vallengeo
POSTGRES_PASSWORD=123456
EOF
``` 
Será criado um arquivo com o nome *.env*, então executar: 
```sh
docker-compose -f ./postgres.yml up
```

Isso irá criar um container com a versão 14-3.2 do PostgreSQL já com os banco de dados criados. O banco expõe a porta definida em *POSTGRES_DB_DOCKER_PORT* do arquivo *.env*.

