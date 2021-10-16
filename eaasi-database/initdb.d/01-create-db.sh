#!/bin/sh

set -eu

echo "Creating database \"${APP_DB_NAME}\"..."
psql --username "${POSTGRES_USER}" <<- EOSQL
	CREATE USER ${APP_USER} WITH PASSWORD '${APP_USER_PASSWORD}';
	CREATE DATABASE ${APP_DB_NAME} OWNER ${APP_USER};
EOSQL
