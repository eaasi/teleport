FROM postgres:11-alpine
COPY ./initdb.d /docker-entrypoint-initdb.d
COPY ./scripts /var/lib/postgresql/scripts
