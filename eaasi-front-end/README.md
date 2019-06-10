# eaasi-front-end

## Summary

EaaSI front end project.
Currently, this repo also contains a PostgreSQL database with the current EaaSI schema.

## Requirements

### Install Docker Desktop

__Mac installation__: https://docs.docker.com/v17.12/docker-for-mac/install/

### Install a Postgres Client

The EaaSI database for development runs in a Docker container. Data persists via a Docker volume. 
If you would like to use a the command-line client `psql` to connect to the database running in a container from the host machine, 
you can install PostgreSQL.

__Mac installation__: 

`> brew install postgres`

You may also connect to the database container using a GUI.  Several recommended options include:
 - [pgAdmin](https://www.pgadmin.org/) 
 - [JetBrains DataGrip](https://www.jetbrains.com/datagrip/)

## Running the PostgreSQL Database

PostgreSQL database for development currently runs in a Docker container.

The database connection port is exposed on `localhost` port `54320` on the host machine.

The username, pass, and db name are all `eaasi_dev`.

`> docker-compose up`

## Querying EaaSI PostgreSQL

`> psql --host localhost --port 54320 -U eaasi_dev`

```sql
 eaasi_dev=> SELECT * FROM "displayDevice";

 displayDeviceID | displayDeviceQID | displayDeviceName
 ----------------+------------------+-------------------
 (0 rows)
```
