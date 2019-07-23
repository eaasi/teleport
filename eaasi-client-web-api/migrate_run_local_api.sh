#!/bin/bash

# Run database migrations
npx sequelize-cli db:migrate --env=local

# Undo any existing seeds in the database
npx sequelize-cli db:seed:undo:all --env=local

# Seed the database
npx sequelize-cli db:seed:all --env=local

# Build and run the Express API with nodemon
npm run local:watch
