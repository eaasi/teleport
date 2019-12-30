![EaaSI Logo](src/assets/header-logo.png)

# eaasi-front-end

This directory contains the Vue.js single page application for the EaaSI Front End.

## Project setup

The application is built using the Vue CLI.

For more information, see [Configuration Reference](https://cli.vuejs.org/config/).

### Installing Dependencies

```
npm install
```

### Running tha Application for development
```
npm run serve
```

After building, the app will run on port 8084 with hot reloading enabled.

### Build deployable artifacts
```
npm run build
```

After building, a `dist` directory will contain the minified project artifacts.

## Tests 

The unit tests can be run using the following command:

```
npm run test:unit
```

_TBD: Browser automation tests_

## Linting

A pre-push git hook is configured to lint the project.  Linting can be invoked manually using the following command:

```
npm run lint
```

## Style Guide 

The [Vue Styleguidist](https://github.com/vue-styleguidist/vue-styleguidist) library is used to generate a static website 
containing example usage of EaaSI front end components.

### Running the Style Guide

The Style Guide can be launched using the following command:

`npm run styleguide`

The Style Guide will be available on port 6060.

### Conventions

`vue-styleguidist` will automatically generate documentation for Vue components annotated with appropriate docstrings.
Developers are strongly encouraged to annotate all new components with docstrings to be parsed by `vue-styleguidist`.

#### Example:

```
  /**
   * A Well-Documented Component 
   * @example ../../docs/MyComponent.Example.md
   */
  @Component({
      name: 'My Component'
  })
```

### Deployment

#### Docker

The app is configured to be deployed to a Docker container.  The Dockerfile for the app is located in the root of the project.
A preliminary build stage runs on `node:latest`, and the application build artifacts are copied to an `/app` directory during 
a subsequent production stage.  The production stage is based on the `nginx:latest` image to serve the application from an
nginx web server.

#### nginx

The built application is served by an `ngnix` server on port 80 from the `app` directory.  

The `nginx.conf` configuration file at the root of the project configures two primary endpoints for the Vue application:
- `/` - Serving the Vue Application `index.html` file
- `/styleguide` - Serving the `vue-styleguidist` static web page.

The application's `vue-router` is configured to run in [HTML 5 History mode](https://router.vuejs.org/guide/essentials/history-mode.html).
This allows the URLs in our application to look "normal" - i.e. without hashes. 
In order to allow `vue-router` to handle requests to URLs in this setup when served, a 
`try_files $uri $uri/ /index.html` option is set at the `/` server block. This provides a catch-all
fallback to the root location of the application, where `vue-router` can take over.

Note that if the route matches a real static asset, it will be served.


### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
