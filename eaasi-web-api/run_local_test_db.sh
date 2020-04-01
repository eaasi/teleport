#!/bin/bash

cd ../ && docker-compose down -v \
       && docker-compose -f docker-compose.test.yml up -d --build eaasi-database