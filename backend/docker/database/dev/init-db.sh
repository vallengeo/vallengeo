  #!/bin/bash

echo "host all  all  0.0.0.0/0  trust" >> /var/lib/postgresql/data/pg_hba.conf
echo "listen_addresses='*'" >> /var/lib/postgresql/data/postgresql.conf

psql --username "$POSTGRES_USER" -f /var/lib/postgresql/create-db.sql

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    \c geoserver
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp" CASCADE;
    CREATE EXTENSION IF NOT EXISTS postgis CASCADE;
    CREATE EXTENSION IF NOT EXISTS "unaccent" CASCADE;
EOSQL