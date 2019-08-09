#!/bin/bash

# Run database migrations
npx sequelize-cli db:migrate --env=production

# Undo any existing seeds in the database
npx sequelize-cli db:seed:undo:all --env=production

# Seed the database
npx sequelize-cli db:seed:all --env=production

# Build and run the Express API with nodemon
npm run prod
