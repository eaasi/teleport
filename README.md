# eaasi-client-dev

## Summary
This repository contains the Vue + Express + PostgreSQL EaaSI application.

---


## Configuration

To run the application in production mode, create a `prod.env` file in the `./eaasi-web-api/env/` directory.
Failure to create a `prod.env` file before launching the application with Docker will cause the Express API to fail.
An example `dev.env` file is provided in that directory for reference.

## Running the Application

This project consists of three layers - a Vue.js front end app (presentation layer), an Express.js web API (service layer), and a PostgreSQL database (persistence layer).
Any of these parts of the application can be run independently on a host, such as a development machine.

### Containerization

A `docker-compose.yml` provides containerization for each of the three parts of the application to run in production mode,
and a volume for PostgreSQL data persistence.

To run the application using Docker, in the root of the project, run:

```bash
docker-compose build && docker-compose up
```

which will build three containers corresponding to the three layers of the application.


The `docker-compose.yml` configuration names three services:
    - `eaasi-database`
    - `eaasi-front-end`
    - `eaasi-web-api`

and a volume `eaasi_db`.


## Project Structure

### eaasi-front-end

This directory contains the Vue.js front-end application.


### eaasi-web-api

This directory contains the Express.js web API.


### eaasi-database

This directory contains scripts related to the PostgreSQL database that provides application state.

