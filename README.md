# Coding Task Application

This application is powered by NodeJS (Express and MongoDB) on backend.Frontend is running VueJS 2 which communicates with over the REST API with backend.

## Required tools

These dependencies are required in order to run this application locally:

- NodeJS (>= 6.0.0)
- NPM
- MongoDB

## Structure
All frontend related files are placed under the `src` directory.Unit testing files could be find under `test/unit/specs`.

Backend source code files could be find under the `server` directory.

## Commands

Application uses slightly modified version of Vue CLI Webpack template.

To start development server run:

``` bash
npm run dev
```

This command will start both frontend and backend application, on ports 8080 and 8081.

To build application for production run:

``` bash
npm run build
```
 
This will save bundled files in `dist` directory, in project root.

To run unit tests run:

``` bash
npm run unit
```

For testing purposes we are using Jest, vue-test-utils (Utilities for testing Vue components) and Moxios (for mocking axios requests).
