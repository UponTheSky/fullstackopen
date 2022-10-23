# Altering data in server

## REST
- **resource**: referring to an individual object
  - **url**: every resource has its unique address(but may be referring to a collection of resources)

- GET, POST requests
  - for JSON data: `Content-Type: application/json`

## Sending Data to the Server
- axios recoginizes a js object and automatically set the `Content-Type` header as `application/json`
- debugging operations related to a distant server

## Changing the Importance of Notes
- modifying the data in the server
  - PUT: replace the entire object
  - PATCH: change only a bit of the whole object

- be aware: make a new object when making a PUT request
  - be careful when it comes to shallow copying

## Extracting Communication with the Backend into a Separate Module
- skim through this part

## Cleaner Syntax for Defining Object Literals
- skim through this part

## Promises and Errors
- handling errors related to communcations with the server
- 404 error(not exist)
- `catch` instead of `then`
