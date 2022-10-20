# JavaScript
- ECMAScript, ES12(2021)
- transpiling for compatiablity: **Babel**
- Node.js: a JS runtime environment

## Variables
- skim through this part

## Arrays
- pass by reference(pointer)
- functional programming paradigm: rather create a new array than modifying it(*immutable*)
- destructuring assignment
- `...`

## Objects
- skim through this part

## Functions
- arrow function
- function declaration vs function expression

## Object methods and "this"
- `this` in `function`, which is inside an object
- when calling the method through a reference, the method loses knowledge of what the original `this` was
  - in JS, the value of `this` is defined based on *how the method is called*
  - when calling the method through a reference the value of `this` becomes a global object
  - or if we pass them as a callback function
 
- how to resolve?: `bind` or arrow function(but not exactly resolving the problem!)

## Classes
- there is no class mechanism in JS, only mimicking
- at the core, they are still an object

## JS Materials