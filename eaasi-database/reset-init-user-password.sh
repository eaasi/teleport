#!/bin/bash

sudo docker exec -it eaasi-database bash -c 'psql -U eaasi_dev --command "call reset_init_user_password();"'
