#!/bin/bash
set -e

POSTGRES="psql --username ${POSTGRES_USER}"

echo "Creating test database role: ${TEST_APP_USER}"

$POSTGRES <<-EOSQL
CREATE USER ${TEST_APP_USER} WITH CREATEDB PASSWORD '${TEST_APP_USER_PASS}';
EOSQL
