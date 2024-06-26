# moovin-groovin-server

Server for integrating Strava API with Music Streaming APIs

## Quick Start

Get started developing...

```shell
# install deps
npm install

# run in development mode
npm run dev

# run tests
npm run test
```

---

## Install Dependencies

Install all package dependencies (one time operation)

```shell
npm install
```

## Run It

#### Run in _development_ mode

Runs the application is development mode. Should not be used in production

```shell
npm run start
```

or debug it

```shell
npm run dev:debug
```

#### Run in _production_ mode

Compiles the application and starts it in production production mode.

```shell
npm run compile
npm start:prd
```

## Test It

Run the Mocha unit tests

```shell
npm test
```

or debug them

```shell
npm run test:debug
```

## Try It

- Open your browser to [http://localhost:3000](http://localhost:3000)
- Invoke the `/examples` endpoint

  ```shell
  curl http://localhost:3000/api/v1/examples
  ```

## Debug It

#### Debug the server

```
npm run dev:debug
```

#### Debug Tests

```
npm run test:debug
```

#### Debug with VSCode

Add these [contents](https://github.com/cdimascio/generator-express-no-stress/blob/next/assets/.vscode/launch.json) to your `.vscode/launch.json` file

## Prisma

https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project-typescript-postgres