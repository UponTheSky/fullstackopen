# Background and introduction
- designed for large-scale JS dev
- offers: dev-time tooling, static code analysis, compile-time type checking, code level documentation

## Main principle
- typescript = a typed superset of JS
  - eventually compiled into plain JS code(programmers can choose the version of the generated code)

- three main parts
1. language: syntax, keywords, and type annotations

2. compiler: responsible for 
  - removing the typing information
  - code transformations into executable JS(**transpilation**)
  - type checking & static code analysis(emitting warnings and errors)
  - additioanl tasks

3. language service: collects type information from the source code
  - for intellisense, type hints, refactoring alternatives

## TypeScript key language features

### Type annotations

```js
const example = (num: number): string => {
  return 'hey';
}
```

### Structural typing
- TS is a structurally typed language
> In structural typing, two elements are considered to be compatible with one another if, for each feature within the type of the first element, a corresponding and identical feature exists within the type of the second element.

### Type inference
- the compiler tries to infer the type information if no type has been specified
- usually: initializing vars, setting parameter default values, determining function return types

```js
const example = (num: number) => 'hey'; // return value is of string type

```

### Type erasure
- type information is erased during transpilation
- no type information at the runtime of the code

## Why should one use TypeScript?
1. offers type checking & static code analysis
  - reducing runtime errors & unit tests related to types

2. type annotation = code level documentation
  - more reusable code

3. now IDEs can provide more specific and smarter intellisense
  - they know exactly what types of data you're processing

## What does TypeScript not fix?
- mainly: runtime errors related to types still possible(when handling external inputs)

### Incomplete, invalid or missing types in external libraries
- when those libraries are not written in TS
- type declaration files could be added

### Sometimes, type inference needs assistance
- kinda "extra" check, which might be dangerous: type assersion, type guards

### Mysterious type errors
- rule of thumb: read from the bottom of the error message
