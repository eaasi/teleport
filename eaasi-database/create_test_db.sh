#!/bin/bash
set -e

POSTGRES="psql --username ${POSTGRES_USER}"

echo "Creating EaaSI Test database:"

$POSTGRES <<EOSQL
CREATE DATABASE ${TEST_DB_NAME} OWNER ${TEST_APP_USER};
EOSQL
