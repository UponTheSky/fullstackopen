# Typing the express app

## Setting up the project
- `yarn init` && `tsc --init`
- install typescript as devdependency(recommended)
- configure `tsconfig.json`

```js
{
  "compilerOptions": {
    "target": "ES6", // which ECMAScript version to use when generating JS
    "outDir": "./build/",
    "module": "commonjs", // use CommonJS modules in the compiled code
    "strict": true, // bunch of "strict..." options altogether
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "esModuleInterop": true
  }
}
```
- eslint configuration

## Let there be code

## Implementing the functionality
- service
  - separated business logic from the router code
  - originated from domain-driven design

- dealing with json fixture data
  - `resolveJsonModule` option
  - type assertion could be required
  - or save it as a separate .ts file

## Node and JSON modules
- node tries to resolve modules in order of extensions
- so when there are files sharing the same name but each has different extension, we may import
a unwanted file instead
- rule of thumb: each file should have distinct name

## Utility Types
- type tools provided by TS
- warning:
  - TS only checks whether we have all of the requried fields or not
  - so data with unwanted fields could be passed to without error 
  - in this case, we need to omit those fields by ourselves 

## Preventing an accidental undefined result
- unfound 404 error

## Adding a new diary
- no-unsafe-assignment rule by eslint

## Proofing requests
- handling external data as input directly in the route could be dangerous
- separate the process into a util method
- then how to deal with an object type, `request.body`?: `unknown` type
- type guard
- type predicate: `<parameterName> is <type>`