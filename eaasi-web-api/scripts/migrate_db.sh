#!/bin/bash

# Run database migrations
npx sequelize-cli db:migrate --env=production
