# Component state, event handlers

## Component helper functions
- separating logics that helps filling extra information when the page is rendered
- defining functions within functions

## Destructuring
- skim through this part

## Page re-rendering
- how to re-render a page when it's pertaining data has changed?

## Stateful component
- using `useState`
- everytime `state` changes via `setState` function, the page rerenders

## Event handling
- registering an event handling function to an event

## Event handler is a function
- important!: why we pass a function `() => logic` rather than `logic` to the props position of an event triggering element?

- an event handler is supposed to be either a *function* or a *function reference*
- if we merely say `logic`, then we're actually running a function when the page is re-rendered
- actually, defining event handlers within JSX templates is not a good idea

## Passing state to child components
- sharing states btw siblings via **lifting the state up**

## Changes in state cause rerendering
- reviewing the materials covered so far

## Refactoring the components
- skim through this part
