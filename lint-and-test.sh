#!/bin/bash

cd eaasi-front-end
npm run lint
npm run test:unit
cd ../eaasi-web-api
npm run lint
npm run test:unit