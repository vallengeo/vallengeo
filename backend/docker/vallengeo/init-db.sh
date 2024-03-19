#!/bin/bash
# Exit immediately if a command exits with a non zero status
set -e
# Treat unset variables as an error when substituting
set -u
function create_databases() {
    database=$1
    owner=$2
    echo "CRIANDO DATABASE '$database' COM OWNER '$owner'"
    psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
      CREATE DATABASE $database WITH OWNER = $owner ENCODING = 'UTF8' TABLESPACE = pg_default CONNECTION LIMIT = -1 template template0;
      GRANT ALL PRIVILEGES ON DATABASE $database TO $owner;
EOSQL
}

if [ -n "$POSTGRES_MULTIPLE_DATABASES" ]; then
  echo "MULTIPLOS BANCO DE DADOS: $POSTGRES_MULTIPLE_DATABASES"
  for db in $(echo $POSTGRES_MULTIPLE_DATABASES | tr ',' ' '); do
    user=$(echo $db | awk -F":" '{print $1}')
    owner=$POSTGRES_USER
    if [[ -z "$owner" ]]
    then
      owner=$POSTGRES_USER
    fi
    create_databases $user $owner
  done
  echo "MULTIPLOS BANCO DE DADOS CRIADOS!"
fi