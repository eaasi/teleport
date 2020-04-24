#!/bin/bash -x
file=../eaasi-web-api/force_db_update

if [ -e "$file" ]; then
  COPY ./create_user.sh   /docker-entrypoint-initdb.d/01-create_user.sh
  COPY ./create_db.sh   /docker-entrypoint-initdb.d/02-create_db.sh
  # COPY ./sql/create_eaasi_schema.sql /docker-entrypoint-initdb.d/02_create_eaasi_schema.sql
fi
