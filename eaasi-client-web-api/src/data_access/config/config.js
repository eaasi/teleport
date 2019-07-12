require('dotenv').config();

module.exports = {
    // Used for local development, postgres database
    // must be available on 127.0.0.1:5432
    "development": {
        "username": "eaasi_dev",
        "password": "eaasi_dev",
        "database": "eaasi_dev",
        "host": "localhost",
        "port": 5432,
        "dialect": "postgres",
        "operatorsAliases": false
    },

    // Used for isolated integration testing. Postgres database
    // must be available on docker compose network 'eaasi-database-test'
    // compose networked services have a hostname of their service name.
    "test": {
        "username": "eaasi_test",
        "password": "eaasi_test",
        "database": "eaasi_test",
        "host": "eaasi-database-test",
        "port": 5432,
        "dialect": "postgres",
        "operatorsAliases": false
    },

    // Used for docker-compose deployment. Postgres database
    // must be available on docker compose network host 'eaasi-database'
    // compose networked services have a hostname of their service name.
    "production": {
        "username": "eaasi_dev",
        "password": "eaasi_dev",
        "database": "eaasi_dev",
        "host": "eaasi-database",
        "port": 5432,
        "dialect": "postgres",
        "operatorsAliases": false
    }
}
