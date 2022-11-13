# First steps with TypeScript

## Setting things up
- build step: transpiling your TS code into executable JS code
  - transpiled code is stored in a separate folder
  - the production environment runs the code in that folder

- in dev environment: real-time compilation and auto-reloading should be useful
  - `ts-node`, `ts-node-dev`
  - TS playground

- setting things
  - `npm init`(or use yarn)
  - `tsconfig.json`: define how TS compiler should work, etc.

## Creating your first own types
- `type` keyword: type alias
- error handling
  - from ver 4.4, catched `error`'s type is `unknown`
  - unknown: the type-safe counterpart of `any` / type assertion or narrowing is required

## @types/{npm_package}
- for a JS package, there are types globally defined for the whole package
  - **@types** organization within npm, maintained by the *Definitely Typed* community project
  - install `@types/{package_name}`
  - sometimes type definition is included in the code itself: no need to separately install `@types`

- remark: the typings are only used before compilation => dev dependencies

## Improving the project
- `interface` keyword

## More about tsconfig

## Adding Express to the mix
- `import` vs `require`: which import statement to use depends on the export method used in the imported package
  - rule of thumb: try importing a module using `import`

## The horrors of any
- in TS, every untyped variable whose type cannot be inferred implicitly become type `any`
- when implicitly inferred as `any`, need to be careful:
  - assigning type is neglected
  - you lose the reason why we're using TS
  - `noImplicitAny` option

- but `noImplcityAny` doesn't complain about *explicitly* typed `any`
  - eslint: `@typescript-eslint`

