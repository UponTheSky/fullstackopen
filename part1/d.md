# A more complex state, debugging React apps

## A note on React version
- version compatibility

## Complex state
- a complex state can be represented as a JS object
- updating an object via `setState` could be a bit messy
- use **object spread** syntax
- why recreate an object?
  - using immutables for preventing any unexpected side effects to occur

- break down an complex state into smaller and simpler substates

## Handling arrays
- generate a new array each time an additioanl element is pushed into

## Conditional rendering
- **conditional rendering**: depending on one of the current states, we can set conditinal return statements

## Old React
- skim through this part

## Debugging React applications
- Chrome's developer console's debugger
- keyword `debugger`(as a breakpoint) or explicitly setting breakpoints
- React developer tools

## Rules of Hooks
- hooks must not be called from inside of a loop, a conditional expression, or any place that is not a function defining a component
  - this is for ensuring that the hooks are always called in the same order
  - a rule of thumb: may hooks only be called from the inside of a react function component

## Event Handling Revisited
- reviewing the event handler mechanism in React

## Function that returns a function
- a function returning another function
- kind of **factory** 

## Passing Event Handlers to Child Components
- skim through this part

## Do Not Define Components Within Components
- do not define a component inside another: every render this inside-component is recognized as
a new component; bad for optimization
