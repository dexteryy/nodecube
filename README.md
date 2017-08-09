
# nodecube

[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependencies Status][dep-image]][dep-url]
[![Greenkeeper badge][greenkeeper-image]](https://greenkeeper.io/)

[![Nodei][nodei-image]][npm-url]

[npm-image]: https://img.shields.io/npm/v/nodecube.svg
[nodei-image]: https://nodei.co/npm/nodecube.png?downloads=true
[npm-url]: https://npmjs.org/package/nodecube
[travis-image]: https://img.shields.io/travis/dexteryy/nodecube/master.svg
[travis-url]: https://travis-ci.org/dexteryy/nodecube
[dep-image]: https://david-dm.org/dexteryy/nodecube.svg
[dep-url]: https://david-dm.org/dexteryy/nodecube
[greenkeeper-image]: https://badges.greenkeeper.io/dexteryy/nodecube.svg

nodecube is a batch of continuously updated base code and configurations for the minimal modern Node.js service that conform to [RESTful API](https://github.com/marmelab/awesome-rest#design), [12-Factor App](https://12factor.net/), [Microservice Architecture](https://github.com/mfornos/awesome-microservices#theory)

> * nodecube-cli: TODO
> * nodecube-example: Boilerplate + demo https://github.com/dexteryy/nodecube-example/

## Features

* TODO

## Integration

* [Express](https://expressjs.com/)
  * [body-parser](https://www.npmjs.com/package/body-parser) + [multer](https://www.npmjs.com/package/multer) + [express-validator](https://www.npmjs.com/package/express-validator) + [cookie-parser](https://www.npmjs.com/package/cookie-parser) + [raw-body](https://www.npmjs.com/package/raw-body)
  * [cors](https://www.npmjs.com/package/cors) + [compression](https://www.npmjs.com/package/compression)
  * [helmet](https://www.npmjs.com/package/helmet)
  * [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) + [express-jwt](https://www.npmjs.com/package/express-jwt)
  * [morgan](https://www.npmjs.com/package/morgan) + [winston](https://www.npmjs.com/package/express-winston) + [errorhandler](https://www.npmjs.com/package/errorhandler)
  * [connect-flash](https://www.npmjs.com/package/connect-flash) + [response-time](https://www.npmjs.com/package/response-time) + [method-override](https://www.npmjs.com/package/method-override)
  * [node-http-proxy](https://github.com/nodejitsu/node-http-proxy)
* [graphql-tools](http://dev.apollodata.com/tools/graphql-tools/index.html) [TODO] / [graphql-server-express](http://dev.apollodata.com/tools/graphql-server/setup.html#graphqlExpress) [TODO] + [graphql-anywhere](https://www.npmjs.com/package/graphql-anywhere) [TODO]
* [gRPC](www.grpc.io) [TODO]
* [mongoose](http://mongoosejs.com/) + [sequelize](https://github.com/sequelize/sequelize) + [ioredis](https://github.com/luin/ioredis) + [aws-sdk-js](https://github.com/aws/aws-sdk-js) [TODO] + [aliyun-sdk](https://github.com/aliyun-UED/aliyun-sdk-js)
* [nodemailer](https://www.npmjs.com/package/nodemailer)
* [uuid](https://www.npmjs.com/package/uuid) + [shortid](https://www.npmjs.com/package/shortid) + [bcrypt](https://www.npmjs.com/package/bcrypt) + [spark-md5](https://www.npmjs.com/package/spark-md5)
* [Docker](https://docs.docker.com/engine/reference/builder/) + [Docker Compose](https://docs.docker.com/compose/compose-file/)
* [Babel v6](babeljs.io)
  * [babel-preset-env (node v7.8+)](https://github.com/babel/babel-preset-env) + [ES2015 modules](https://www.npmjs.com/package/babel-plugin-transform-es2015-modules-commonjs) + [add-module-exports](https://github.com/59naga/babel-plugin-add-module-exports) + [Object rest spread](http://babeljs.io/docs/plugins/transform-object-rest-spread/) + [Class Properties](http://babeljs.io/docs/plugins/transform-class-properties/) + [Legacy Decorator](https://www.npmjs.com/package/babel-plugin-transform-decorators) + [JSX + Flow](http://babeljs.io/docs/plugins/preset-react/)
* [ESLint v2](http://eslint.org/) ([babel](https://www.npmjs.com/package/babel-eslint) + [react](https://www.npmjs.com/package/eslint-plugin-react) + [flowtype](https://github.com/gajus/eslint-plugin-flowtype) [TODO] + [graphql](https://www.npmjs.com/package/eslint-plugin-graphql) [TODO] + [fp](eslint-plugin-fp) [TODO]) + [Flow](flowtype.org)
* [AVA](https://github.com/avajs/ava) [TODO] / [Mocha](http://mochajs.org/) & [Chai](http://chaijs.com/) + [supertest](https://www.npmjs.com/package/supertest) + [nock](https://www.npmjs.com/package/nock) + [Sinon.JS](http://sinonjs.org/) + [faker.js](https://github.com/Marak/Faker.js)
* [dotenv](https://www.npmjs.com/package/dotenv) + [Plop](https://github.com/amwmedia/plop) [TODO] ([Handlebar](http://handlebarsjs.com/) + [Inquirer](https://www.npmjs.com/package/inquirer)) + [Commitizen](https://www.npmjs.com/package/commitizen) ([cz-conventional-changelog](https://github.com/commitizen/cz-conventional-changelog)) + [Husky](https://github.com/typicode/husky) + [EditorConfig](http://editorconfig.org/)


Boilerplate as [library](https://github.com/dexteryy/nodecube/blob/master/src/):

- `httpService` - [example](https://github.com/dexteryy/nodecube-example/blob/master/server/index.js)
- `errorTrigger` + `errorResponse` - [example](https://github.com/dexteryy/nodecube-example/blob/master/server/api/github/index.js)
- `logger`
- `mongo` / `rds` / `redis` / `oss` - [example](https://github.com/dexteryy/nodecube-example/blob/master/server/utils/connectServices.js)
- `authorization` - [example](https://github.com/dexteryy/nodecube-example/blob/master/server/api/auth/index.js)


## How to create an API service project

#### Step 1

Use nodecube-cli (TODO) or imitate the [nodecube-example](https://github.com/dexteryy/nodecube-example/) to create the minimal structure and configure files:

- **configs/** - Project-defined configuration files and build scripts
  - ... - See `Step 2`
- **data/** -
  - **mongo/** - Initial data for MongoDB container
    - `test_data.json`
  - **mysql/** - Initial data for MySQL container
    - `test_data.sql`
- **server/** - All source code
  - **common/** - Reusable code
    - **model/**  
    - **utils/**  
    - ...
  - **api/** - Express Routers for API requests
    - **common/** - Reusable code shared between feature sets
    - **feature1/** - A feature set
      - `index.js`
      - `index.spec.js`
    - **feature2/** - A feature set
    - ...
    - [`index.js`](https://github.com/dexteryy/nodecube-example/blob/master/server/api/index.js)
  - **utils/**  
    - [`connectServices.js`](https://github.com/dexteryy/nodecube-example/blob/master/server/utils/connectServices.js) - All external services needed to be connected
  - [`index.js`](https://github.com/dexteryy/nodecube-example/blob/master/server/index.js) - The `server` object and HTTP `service` object generated by nodecube's `httpService` factory
- [`server.js`](https://github.com/dexteryy/nodecube-example/blob/master/server.js) - Load environment variables from [`env.config`][custom.env.sample.config]
- [`env.config`][custom.env.sample.config] - Project-defined configuration options for nodecube and project code
- [`package.json`](https://github.com/dexteryy/nodecube-example/blob/master/package.json) - Minimal dependencies and npm scripts based on ndoecube
- ... - See `Step 2`
- [`.eslintrc.yml`](https://github.com/dexteryy/nodecube-example/blob/master/.eslintrc.yml)
- [`.editorconfig`](https://github.com/dexteryy/nodecube-example/blob/master/.editorconfig)

#### Step 2

Add the project-defined template file for [env.config][custom.env.sample.config]

```
cp ./node_modules/nodecube/configs/env.sample.config ./configs/
```

Add the Dockerfile only for production (or staging) environment

```
cp ./node_modules/nodecube/configs/Dockerfile ./
```

Add other configuration files depended by nodecube and recommended npm scripts

```
cp ./node_modules/nodecube/configs/babelrc ./.babelrc
cp ./node_modules/nodecube/configs/gitignore ./.gitignore
cp ./node_modules/nodecube/configs/dockerignore ./.dockerignore
```

#### Step 3

Generate your project-defined compose file ([example](https://github.com/dexteryy/nodecube-example/blob/master/configs/docker-compose-dev.override.yml)) for development evironment, see [Multiple Compose files](https://docs.docker.com/compose/extends/#multiple-compose-files)

```bash
cp ./node_modules/nodecube/configs/docker-compose-dev.override.sample.yml ./configs/docker-compose-dev.override.yml
# This file may need to be modified to fit your needs (follow TODO comments)
vim ./configs/docker-compose-dev.override.yml
```

Optionally, generate the [`Dockerfile for mongoimport`](https://github.com/dexteryy/nodecube-example/blob/master/configs/Dockerfile-mongoimport) (for running [mongoimport](https://docs.mongodb.com/manual/reference/program/mongoimport/) in the `mongo` container)

```bash
cp ./node_modules/nodecube/configs/Dockerfile-mongoimport.sample ./configs/Dockerfile-mongoimport
# This file must be modified to fit your needs
vim ./configs/Dockerfile-mongoimport
```


## How to work with the API service project

### Setup

```
cp configs/env.sample.config env.config
```

For developers in China:

```
cp ./node_modules/nodecube/configs/Dockerfile-china Dockerfile-dev
```

For other developers:

```
cp Dockerfile Dockerfile-dev
```

Install dependencies

```bash
yarn
```

### Create or update containers for development environment

Remove all old containers and images, build new ones and run testing

```
npm run dev:rebuild
```

Just remove database containers and images

```
npm run dev:empty
```

Just remove all containers and images

```
npm run dev:reset
```

### Update

Reinstall all dependencies and update lock file

```
npm run upgrade
npm run dev:rebuild
```

### Local testing

```
npm run lint
```

```
npm run dev:test
```

### Running in development environment

```
npm run dev
```

```
npm run dev:debug
```

### Running in production (or staging) environment

Need a new `docker-compose.yml` with reconfigured environment variables

### Continuous integration

Send pull request to `master` branch

### Continuous deployment

Send pull request to `production` (or `staging`) branch


[env.sample.config]: https://github.com/dexteryy/nodecube/blob/master/src/configs/env.sample.config
[custom.env.sample.config]: https://github.com/dexteryy/nodecube-example/blob/master/configs/env.sample.config
