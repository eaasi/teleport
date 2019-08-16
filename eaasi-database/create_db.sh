#!/bin/bash
set -e

POSTGRES="psql --username ${POSTGRES_USER}"

echo "Creating EaaSI database:"

$POSTGRES <<EOSQL
CREATE DATABASE ${DB_NAME} OWNER ${APP_USER};
EOSQL
