#!/bin/sh

set -eu

outfile=${1:-'eaasi-backup.sql'}

pg_dump --username "${POSTGRES_USER}" \
	--file "${outfile}" \
	"${APP_DB_NAME}"
