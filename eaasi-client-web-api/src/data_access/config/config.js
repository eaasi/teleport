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

    // TBD
    "test": {
        "username": "eaasi_dev",
        "password": "eaasi_dev",
        "database": "eaasi_dev",
        "host": "eaasi-database",
        "port": 5432,
        "dialect": "postgres",
        "operatorsAliases": false
    },

    // Used for docker-compose deployment, postgres database
    // must be available on compose network 'host eaasi-database'
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
