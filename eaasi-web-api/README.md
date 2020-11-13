![EaaSI Logo](../eaasi-front-end/src/assets/header-logo.png)

# eaasi-web-api

This directory contains the Express.js web server application for the EaaSI Front End.
This app is "the back end of the front end," and has the following responsibilities:

- Provides a proxy for requests from the Vue.js single-page app in the client to the OpenSLX eaas-server.
- Exposes an interface to the EaaSI metadata model
- Reads and writes data to a SQL database for client-specific business logic
- Provides client-specific business logic, including user management, interaction with SAML identity providers, bookmarking, background task management, blog syndication, and metadata serialization.


---


## Quick Links

[Project Setup](#project-setup)

[Tests](#tests)

[Linting](#linting)

[Checking Types](#checking-types)

[Generating API Docs](#generating-api-documentation)

[Sequelize ORM](#sequelize-orm)

[Deployment](#deployment)

---


## Project Setup

The application is a web API built on [Express.js](https://expressjs.com/) using Typescript.

### Installing Dependencies

```
npm install
```

### Running tha Application for development

The application can run in development mode with hot reloading enabled mode using the following command:

```
npm run local:watch
```

After building, the app will run on port 8081 with hot reloading enabled.  In this mode, the `NODE_ENV` environment variable is set to `'local'`

### Build deployable artifacts
```
npm run build
```

`babel` is used to transpile Typescript and copy all artifacts to the `dist` directory.


---


## Tests

`jest` is used to run the tests.

The unit tests can be run using the following command:

```
npm run test:unit
```

### Generating test coverage

Test coverage can be viewed using the following command:

```
npm run test:unit:coverage
```


---


## Linting

A pre-push git hook is configured to lint the project.  Linting can be invoked manually using the following command:

```
npm run lint
```


---


## Checking Types

Typescript is used throughout the project, and is the preferred language for current development.

Smoke test Typescript using:

```
npm run check-types
```


---


## Generating API Documentation

The [apiDoc](https://apidocjs.com/) library is used to generate API documentation.

### Generating the Documentation

API documentation can be generated using:

`npm run generate-docs`

This will create a static webpage available in the `apidoc` directory in the root of the project.

### Conventions

`apidoc` will automatically generate documentation for endpoints annotated with the appropriate docstrings.
Developers are strongly encouraged to annotate all new endpoints with docstrings to be parsed by `apidoc`.

#### Example:

```
/**
 * @api {get} gets content object metadata
 * @apiVersion 1.0.0
 * @apiName Content Resource Metadata
 * @apiGroup Resources
 * @apiPermission System Administrator only
 * @apiDescription Gets Content Object Metadata from the eaas java api
 */
router.get('/content', (req, res) => controller.getContent(req, res));
```


---


## Sequelize ORM

[Sequelize](https://sequelize.org) is used in the application as an ORM.

[sequelize-typescript](https://www.npmjs.com/package/sequelize-typescript) is used to provide decorators and better Typescript support.


---


## Updating Database Schema

The project is developed in a code-first manner with respect to database modeling.
TypeScript models define the entities that make up the database schema.
Changes to the database schema are enacted using migrations.  In this way, changes to the schema are atomic, determinstic, and synchronized across any environment.


### Creating or Updating a Database Table

1 - Create or modify the TypeScript model corresponding to the entity you would like to create or change.  These models are currently in subdirectories located in `src/data_access/models`.

2 - Generate a new migration file using the provided npm script: `npm migration <name_of_migration>`. Alternatively, you can use the sequelize tooling directly: `npx sequelize-cli migration:create --name <name_of_migration>`.  This will generate a file prefixed with a timestamp in `src/data_access/migrations`.

3 - Open the newly-created migration file, and complete the functions for `up` and `down` using sequelize.  Examples and relevant syntax for creating, updating, or deleting new tables, columns, and relationships are provided in the [sequelize documentation](https://sequelize.org/master/manual/migrations.html#migration-skeleton).  It's important that the migrations define the schema properly, as it is these files that sequelize uses to execute the SQL commands to update the database.

4 - Running the API using the standard entry point script locally `./migrate_run_local_api.sh` will start the API.  In `src/app.ts`, `sequelize.sync()` is called, which synchronizes the database with current model state using the migration files.

---


## Deployment

### Docker

The app is configured to be deployed to a Docker container.  The Dockerfile for the app is located in the root of the project.
A preliminary build stage runs on `node:10.16-alpine`.  The Dockerfile exposes port `8081` for the API.

### wait-for-it

The web API depends on the availability of a PostgreSQL database, where domain entity state is persisted.
As the database engine may or may not be ready to accept connections before the API server is launched, the [`wait-for-it.sh`](https://github.com/vishnubob/wait-for-it)
bash script is run during production.
