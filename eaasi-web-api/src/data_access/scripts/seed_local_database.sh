#!/bin/bash

affected_tables="eaasi_role emulator"

function run_all_seeders {
  printf "Running database seeders on local PostgreSQL eaasi_dev database."
  npx sequelize-cli db:seed:undo:all --env=local
  npx sequelize-cli db:seed:all --env=local
}

function ping_local_psql {
  is_db_ready=pg_isready --dbname=eaasi_dev --username=eaasi_dev --host=localhost --port=5432
  if [[ $is_db_ready == *"accepting"* ]];
  then
    printf "Local PostgreSQL Database eaasi_dev is accepting connections.\n"
  else
    printf "ERROR: Cannot seed database. Is the eaasi_dev PostgreSQL database running locally?\n"
    exit 1
  fi
}

printf "\n** WARNING ** : This is a destructive action.
You are about to seed your local database using the
scripts defined in the data_access/seeders directory.
Running this command will remove any data in tables
that are initially populated with seed data.
This currently includes the following tables:\n\n"

for val in $affected_tables; do
  echo "\t: \033[1m\033[33m$val\033[0m"
done

printf "\n"

printf "This will also remove any data populated
in the metadata model tables.\n"

echo "\033[1mDo you wish to continue? [y/n]:\033[0m"

while true; do
  read -p "" yn
  case $yn in
    [Yy]* ) $(run_all_seeders); break;;
    [Nn]* ) exit 0;;
    * ) echo "\033[1mPlease provide y/n\033[0m\n";;
  esac
done
