# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/Sergey-Ado/nodejs2024Q3-service.git
```
```
cd nodejs2024Q3-service
```

## Installing NPM modules
```
git checkout dev-part1
```
```
npm install
```

## Running application

```
npm start
```
1. By default, the application runs on PORT 4000. If necessary, you can create an .env file based on .env.example and specify the PORT you need in it. 
2. After starting the app on port you can open in your browser OpenAPI documentation by typing `http://localhost:{PORT}/doc/`.

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

### Auto-fix and format

```
npm run lint
```

```
npm run format
```
