#!/bin/bash

pg_dump -U eaasi_dev --file='eaasi_dev_backup.sql' eaasi_dev
