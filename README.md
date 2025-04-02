![EaaSI Logo](eaasi-front-end/src/assets/header-logo.png)

# eaasi-client-dev

## Summary
This repository contains the Vue + Express + PostgreSQL + nginx EaaSI application.

### Development Requirements:

- node v10.15.3
- Docker
  - Docker Desktop recommended for local development
- Vue cli v3.6.3

This project has been developed and tested using unix-like environments (macOS, debian)

---
## Architecture Diagram

![eaasi-client-dev architecture diagratm](eaasi-client-dev-diagram.png)

## Configuration

To run the application in production mode, create an `.env.production` file in the following locations:

- `./eaasi-web-api/.env`
- `./eaasi-front-end/.env`

Failure to create `.env.production` files before deploying the application with `docker-compose` will result in complete loss of functionality.
Example `.env.development` files are provided in the root of each project for reference.

> Note: When the containers are run using `docker-compose`, they are automatically networked and can communicate with each other using their specified container names.
> See [https://docs.docker.com/compose/networking/](Networking in Compose), for example. Note the implementation in the project's `nginx.conf` and the production mode database settings in the API project.

## Running the Application

The `eaasi-client-dev` project consists of four layers - a Vue.js front end app (presentation), an Express.js web API (service), a PostgreSQL database (persistence), an nginx web server (reverse proxy).

Each part of the application can be run independently using tooling provided in each project (or, in the case of the database or web server, by using locally running instances).

Additionally, the entire application can be deployed and run using `docker-compose`.

### Containerization

A `docker-compose.yml` provides a containerization spec for the application.

Postgres data is stored in a Docker volume so that data persists independently of the container that runs PostgreSQL.

#### Makefile

To run the application using `docker-compose`, in the root of the project, run:

```
make build-run
```

This will build four containers.

The `docker-compose.yml` configuration specifies four services:

  - `eaasi-nginx`
  - `eaasi-database`
  - `eaasi-front-end`
  - `eaasi-web-api`

and a volume `eaasi_db`.


## Project Structure

### eaasi-front-end

This directory contains the Vue.js front end application.


### eaasi-web-api

This directory contains the Express.js web API, which serves as a proxy to the OpenSLX `eaas-server` and provides a service layer for the front end.


### eaasi-database

This directory contains scripts related to the PostgreSQL database that provides client application state.


### eaasi-nginx

This directory contains an nginx configuration (and several alternative variations) for running the applications behind a reverse proxy.  The default setup is configured to run all applications on the same host.

Note that the configuration will need to be manually updated to suit the target deployment environment.

Additional configurations are provided to route to subdomains for all or part of the application services.


## Prioritization Board

As of March 2024, the EaaSI team makes structured use of the eaasi-client-dev repository's issue tracker's [Prioritization Board](https://gitlab.com/eaasi/eaasi-client-dev/-/boards) to communicate scope and status of front-end work between distributed team members at OpenSLX, Dual, and Yale.

### Ticket Status

The Priotiziation Board is organized into the following Lists (organized by scoped labels) to indicate status (and implicit ownership):

~"Frontend::Backlog" - Indicates a ticket/work that has been to some degree defined but should not yet be put into active development. All new tickets should first be added/created in the Backlog column. Tickets that have progressed to some degree to the ensuing columns can be placed back here to scope them out of the current public release cycle. All team members are empowered to add new tickets to the Backlog; Yale team members are primarily responsible for moving tickets out of (or back to) the Backlog.

~"Frontend::Up Next" - Indicates work has been defined and identified as a target for the current release cycle, but no active work has yet been started to address. This column should generally be considered an active queue for work to be completed by Dual (unless tickets are specifically assigned otherwise, to an individual OpenSLX or Yale team member) and Dual team members are primarily responsible for moving tickets out of Up Next to In Progress.

~"Frontend::In Progress" - Indicates the work to be included in the current release cycle, and active work is being done by Dual (or, if explicitly assigned to an individual team member, by OpenSLX or Yale) to generate related commits and merge requests. Unless otherwise assigned, Dual team members are primarily responsible for moving tickets out of In Progress to In Code Review.

~"Frontend::In Code Review" - Indicates related Merge Requests have been created and require code review by OpenSLX. This column should be considered an active queue for work by OpenSLX and unless otherwise assigned, OpenSLX team members are primarily responsible for moving tickets out of In Code Review to In User Testing.

~"Frontend::In User Testing" - Indicates related merge requests have been reviewed by OpenSLX and deployed to a test server for user-facing tests. This column should be considered an active queue for work by Yale and unless otherwise assigned, Yale team members are primarily responsible for moving tickets out of In User Testing to Passed User Testing.

~"Frontend::Passed User Testing" - Indicates ticket/work appears complete or resolved; related merge requests can be merged into primary repository branch for public release and ticket closed. This column should be considered an active queue for work by OpenSLX (to complete MRs) unless otherwise assigned, and OpenSLX team members are primarily responsible for closing out tickets via merge requests.

### Ticket Priority

Scoped priority labels are assigned to every ticket in the Prioritization board by the Yale team to indicate criticality to platform functionality (**not** time-sensitivity).

When addressing tickets within their active queue/Status column, team members should work in order of priority labels (highest to lowest) as best they are able (e.g. unless blocked or waiting on response/input from other team members).

~"priority::1 (High)" - Defined ticket is critical to core functionality of the platform and must be resolved before next public release

~"priority::2 (Medium)" - Defined ticket is not critical to core functionality but worth resolving before next public release (due to e.g. significant UX confusion, improvement of system performance, etc.)

~"priority::3 (Low)" - Defined ticket is a nice-to-have fix or improvement that should only be addressed after higher-level priority tickets are addressed; can be sent to Backlog rather than included in next public release with team consensus

### Ticket Type

Every ticket on the Prioritization board should also be assigned one of three possible labels to communicate the type of work defined within:

~"bug report" - Unexpected behavior or issue encountered on a live/deployed server

~"feature" - New, desirable functionality, not yet present in the EaaSI platform or the front-end EaaSI UI application specifically

~"enhancement" - Improvement to the EaaSI platform and/or the front-end EaaSI UI application specifically

### Other Labels

Additional labels can be assigned to indicate special ticket status, particularly where front-end development overlaps with back-end EaaS server development.

~"blocked" - Indicates the task or fix described in the ticket cannot currently be implemented without back-end changes or clarification. This label is primarily intended for use by Dual team to communicate with OpenSLX, in either the In Progress or In Code Review columns.

~"needs triage" - Indicates uncertainty with described behavior or enhancement in regard to source of issue (i.e. whether fix requires strictly front-end or back-end or server configuration adjustments). This label is primarily intended for use in conjunction with the "bug report" label, by the Yale team, to flag items in the Backlog for review by OpenSLX.