# Getting data from server
- using `json-server` package: `json-server --port 3001 --watch db.json`
- possible data flow
  - the browser fetches data from the server
  - using this data, the browser renders a page
  - when there is a change in data, both 1) the client page and 2) the server page gets changed
    - React code does this (kind of)simultaneously

## The browser as a runtime environment
- event handler
  - the function is defined before the targeting event occurs
  - and this function is executed later - **asynchronous**

- JS engines(runtime envs) follow asynchronous model
  - all I/O(with some exceptions) operations are executed as non-blocking
  - code execution continues immediately after calling an I/O function, without waiting for it to return
  - after our asynchronous I/O operation is completed, the JS engine calls the event handler registered to the operation

- **single-threaded JS engine**: cannot execute code in parallel
  - so for executing I/O operations, it is necessary for it to use a non-blocking model for executing I/O operations
  - for the browser to be responsive, no single computation should take long time tos play

## npm
- node package manager
- skim through this part
- `dependencies` vs `devDependencies`

## Axios and promises
- **promise**?: an object representing the eventual completion or failure of an asynchronous operation
- three states:
  - **pending**: operation is not completed yet
  - **fulfilled**: the operation has been completed: succeeded
  - **rejected**: some kind of error has happened before completion: failed

- `then`: you register a event handler with this method to a promise object, so that after either a successful completion, this handler is executed
  - the format of data is depending on the type specified at `Content-Type` header

## Effect-hooks
- use `useEffect` for data fetching

## The development runtime environment
- the overall picture of the current dev environment
