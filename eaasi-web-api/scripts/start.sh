#!/bin/sh

set -eu

echo "Waiting for database at '${DB_HOST}:${DB_PORT}'..."
timeout 60s sh -c 'while ! nc -z $0 $1; do sleep 1; done' "${DB_HOST}" "${DB_PORT}"

echo "Running database migrations..."
npx sequelize-cli db:migrate --env=production

echo "Executing 'node $@'..."
exec node "$@"
