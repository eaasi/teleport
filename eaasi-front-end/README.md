# eaasi-front-end

## Summary

EaaSI front end project.
Currently, this repo also contains a PostgreSQL database with the current EaaSI schema.

## Requirements
- Install Docker for Mac
  - Mac:
    - https://docs.docker.com/v17.12/docker-for-mac/install/

- Install Postgres (Optional)
  The EaaSI database for development runs in a Docker container.  If you would like to use a PostgreSQL client like `psql`, you can install PostgreSQL, you can install PostgreSQL on your host machine.
  - Mac:
    - `> brew install postgres`

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
