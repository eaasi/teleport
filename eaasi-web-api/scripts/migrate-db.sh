#!/bin/sh

config="${1:-production}"

echo "Running database migrations..."
npx sequelize-cli db:migrate --env=${config}
