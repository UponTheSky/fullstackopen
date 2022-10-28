# Structure of backend application, introduction to testing

## Project structure
- separate modules:
- utils
  - logging: `utils/logger.js`
  - envvars: `utils/config.js`

- controllers(route handlers)
  - `express.Router` constructor
  - this object is in fact a middleware, that can be used for defining related routes in a single place, that is typically placed in its own module
  - `app.use('api/notes, notesRouter)`: so the `noteRouter` object must only define the relative parts of the routes

- app: `app.ts`(creates the actual application)

- model: defining schema for data

- index: only for running the server

## Note on exports
- skim through this part

## Testing Node applications
- automated testing
- `jest`, `ts-jest`, `jest.config.js`, configuring eslint
- `describe`: grouping tests into logical collections
- 