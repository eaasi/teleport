#!/bin/bash

cd ../

# Remove database bind mount
rm -rf eaasi_db

# Build and run the Express API with nodemon
npm run local:watch
