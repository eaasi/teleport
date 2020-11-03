const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;

module.exports = {
	// Used for local development, postgres database
	// must be available on localhost:5432
	'local': {
		'username': 'eaasi_dev',
		'password': 'eaasi_dev',
		'database': 'eaasi_dev',
		'host': 'localhost',
		'port': 5432,
		'dialect': 'postgres',
	},

	// Used for development, postgres database must be available on
	// docker compose network host 'eaasi-database'
	// compose networked services have a hostname of their service name.
	'development': {
		'username': 'eaasi_dev',
		'password': 'eaasi_dev',
		'database': 'eaasi_dev',
		'host': 'localhost',
		'port': 5432,
		'dialect': 'postgres',
	},

	// Used for isolated integration testing. Postgres database
	// must be available on localhost:5432
	'test': {
		'username': 'eaasi_test',
		'password': 'eaasi_test',
		'database': 'eaasi_test',
		'host': 'localhost',
		'port': 5432,
		'dialect': 'postgres',
	},

	// Used for docker-compose deployment. Postgres database
	// must be available on docker compose network host 'eaasi-database'
	// compose networked services have a hostname of their service name.
	'production': {
		'username': DB_USERNAME,
		'password': DB_PASSWORD,
		'database': DB_NAME,
		'host': DB_HOST,
		'port': DB_PORT,
		'dialect': 'postgres',
	}
};
