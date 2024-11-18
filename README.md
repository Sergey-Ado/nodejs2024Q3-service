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
git checkout dev-part2
```
```
npm install
```

## Running application

1. By default, the application runs on PORT 4000. If necessary, you can create an .env file based on .env.example and specify the PORT you need in it. 

**Important!** When you restart the application with new settings, you must first delete containers and volumes.

2.
```
npm run docker:start
```
**Important!** When you first launch an application, postgres and application images is downloaded from Docker Hub. It can take some time.

3. After starting the app on port you can open in your browser OpenAPI documentation by typing `http://localhost:{PORT}/doc/`.

## Stop application
```
npm run docker:stop
```
Important! The stop command must be run from a second terminal

## Testing

After application running open new terminal and enter:

To run all tests without authorization
```
npm run test
```

To run only one of all test suites
```
npm run test -- <path to suite>
```

To run tests inside the container
```
npm run docker:test
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
