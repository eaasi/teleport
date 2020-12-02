#!/bin/bash

# Run database migrations
npx sequelize-cli db:migrate --env=production

# Seed the database
npx sequelize-cli db:seed:all --env=production

# Start the eaasi_web_api application in production mode
npm run prod
