# Validation and ESLint
- we want our requests to be valid: no empty content for example
- how to validate the format of the data?
  - validation rules defined in the schema(built-in by Mongoose)
  - now update the error handling middelware correspondingly
  - for updating(`findByIdAndUpate`): add additional configs

## Deploying the database backend to production
- skim through this part

## Lint
- **lint**?: any tool that detects or flags errors in programming languages, including stylistic errors
- **ESLint**: static analyis tool(i.e. run before program execution)
  - `.eslintrc.js`, `.eslintignore`