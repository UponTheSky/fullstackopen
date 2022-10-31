# Testing the backend
- unit testing
- mocking database
- integration testing: multiple components of the system are being tested as a group

## Test environment
- mode; production vs development vs testing
- `NODE_ENV` environment variable could be set in `package.json`'s `scripts`
- `runInBand`: run tests serially

- separate test database
  - have an isolated test environment from other collegues
  - a test execution requires a single db instance not used by other concurrently running tests

- `MONGODB_URI` vs `TEST_MONGODB_URI`

## supertest
- `supertest` package for testing APIs
- we have to close the connection with the DB if the test ends(`afterAll` method)
- supertest takes care of PORT assignment

## Initializing the database before tests
- our tests depend on a specific state of the current database
- we need to generate independent test data in a controlled manner before we run the tests
- `beforeEach` function in jest

## Running tests one by one
- how to test one single test?: pass the name of the test you want into the `yarn test` commandline
- `yarn test <testname>`
- remark: `--` means?: https://stackoverflow.com/questions/43046885/what-does-do-when-running-an-npm-command

## async/await
- ES7: use async functions that return a promise in a way that makes the code look synchronous
- callback hell: if we want to make several async function calls in sequence, the situation would soon become painful:
  - the async calls would have to be made in the callback => complicate code

- solution: promise chain
- async/await: syntactic sugar

- few things to remark:
  - `async` function has to return a promise
  - `await` can only be used inside `async`

## async/await in the backend
- just check

## More tests and refactoring the backend
- just check

## Error handling and async/await
- recommended: `try/catch`

## Eliminating the try-catch
- using a library => not personally preferred...

## Optimizing the beforeEach function
- be careful when dealing with a loop statement involving async operations
- even if `await` is *inside* a `async` block, if `async` scope is not the immediate wrapper of `await`, 
this `await` is recognized as a separate async operation
- `Promise.all`

## Refactoring tests
- just check