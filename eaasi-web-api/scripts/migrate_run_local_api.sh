#!/bin/bash

# Start the database
cd ../ && docker-compose down -v \
       && docker-compose up -d --build eaasi-database

cd ./eaasi-web-api

# The wait-for-it.sh script works well on Linux distros, but not on macOS
# due to the lack of `timeout`. Uncomment the following lines to enable
# intelligent waiting for database to accept connections on *nix machines:

# echo "Checking if local PostgreSQL is ready to accept connections...."
# $(./wait-for-it.sh localhost:5432 -- echo "local PostgreSQL is ready.")

# wait-for-it.sh can be run on macOS with the following modifications
# to your macOS dev environment:
# $ brew install coreutils
# $ alias timeout=gtimeout

# Replace with wait-for-it above on *nix environments
sleep 20

# Run database migrations
npx sequelize-cli db:migrate --env=local

# Prompt user to run or skip Database seeding,
# which is a destructive action.
npm run db:seed:local

# Build and run the Express API with nodemon
npm run local:watch
