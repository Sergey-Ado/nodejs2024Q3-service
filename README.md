# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker Desktop (for Mac or Windows) or Docker Engine (for Linux).

## Downloading

```
git clone https://github.com/Sergey-Ado/nodejs2024Q3-service.git
```
```
cd nodejs2024Q3-service
```

## Installing NPM modules
```
git checkout dev-part3
```
```
npm install
```

## Running application

1. Create a `.env` file based on the `.env.example` file. Change settings if necessary. 

**Important!** When you restart the application with new settings, you must first delete containers and volumes.

2.
```
npm run docker:start
```
**Important!** When you first launch an application, postgres and application images is downloaded from Docker Hub. It can take some time.

3. After starting the app on port you can open in your browser OpenAPI documentation by typing `http://localhost:{PORT}/doc/`.
4. For ease of checking, `log` files inside the container are duplicated in the external `logs` folder

## Stop application
```
npm run docker:stop
```
Important! The stop command must be run from a second terminal

## Testing

After application running open new terminal and enter:

To run all tests with authorization
```
npm run test:auth
```
To run test of refresh token
```
npm run test:refresh
```
**Important!** Don't run `npm run test`. It is not meant for this task


To run tests inside the container
```
npm run docker:test:auth
```
```
npm run docker:test:refresh
```

## Vulnerability scanning
To scan for postgres image vulnerabilities, run
```
npm run scan:postgres
```
To scan for application image vulnerabilities, run
```
npm run scan:app
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```
