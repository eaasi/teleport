#!/bin/bash
file=./force_db_update

# Run database migrations
npx sequelize-cli db:migrate --env=production

if [ -e "$file" ]; then
    # Undo any existing seeds in the database
    npx sequelize-cli db:seed:undo:all --env=production

    # Seed the database
    npx sequelize-cli db:seed:all --env=production

    rm -f "$file"
fi

# Build and run the Express API
npm run prod
