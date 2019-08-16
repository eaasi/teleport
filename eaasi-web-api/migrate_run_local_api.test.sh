#!/bin/bash

# Run database migrations
npx sequelize-cli db:migrate --env=test

# Undo any existing seeds in the database
npx sequelize-cli db:seed:undo:all --env=test

# Seed the database
npx sequelize-cli db:seed:all --env=test

# Build and run the Express API with NODE_ENV=test
npm run local:test
