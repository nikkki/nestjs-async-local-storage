## Description

Repo based on [NestJS](https://github.com/nestjs/nest) framework TypeScript starter repository.  
It helps to understand how to implement basic logger with [AsyncLocalStorage](https://nodejs.org/api/async_hooks.html#async_hooks_class_asynclocalstorage) native node.js class.  
Features: 
- Accepts via header `X-Request-ID` - for easitier tracing of logs and sets into each log object.
- Controllers has as a dependency `AsyncLocalStorage` with logger and passes it as dependency via each method to Service.
- No dependencies besides NestJS itself.



## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Curl request example
`curl  --header "X-Request-iD: 123-333-22" http://localhost:3000/`  
result in console:  
`// Hello World Logs { correlationId: '123-333-22' }`

## General implementation description

1. Root app module accepts in `providers` new empty instance of AsyncLocalStorage(`app.module.ts`).
2. On each request middleware `SetupAsyncContextMiddleware` sets new instance of store in our case it is `new Map()`;
3. Then second middleware `LoggerMiddleware` sets new instance of logger into asyncLocalStorage with uniq correlationId, which will be provided in the each log.
4. Finally,each controller has a dependency of instance of AsyncLocalStorage(from step 1) and in each call of controller's method we getting logger from storage and putting it in the Service method(`app.service.ts`).

## Caveats
1. Don't use `AsyncLocalStorage` as dependency in Services. It will be a leak of abstraction. Service can use only logger without knowledge of any "storages".
