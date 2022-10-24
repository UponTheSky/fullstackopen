# Node.js and Express
- setting the basic project configs via `package.json`

# Simple web server
```js
import http from 'http';
```
- `http`: node's built-in web server module
- `import`(ES6) vs `require`(CommonJS)

```js
const app = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.end('Hello world');
});
```
- `createServer`: create our web server(`app`)
- `(request, response) => ...`: the event handler

```js
const PORT = 3001;
app.listen(PORT)
console.log(`Server running on port ${PORT}`);
```
- bind our http server to the port 3001

```js
const app = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.end(JSON.stringfy(notes));
});
```

## Express
- why express? using `http` module directly is cumbersome; we need some kind of abstraction
- aside: npm dependencies 
  - semantic versioning
  - `npm update`(or `yarn upgrade`)
  - backward compatibility: if the major number does not change

## Web and Express
```js
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
});
```
- defining routers & enrolling event handlers to each of the routers
- in this case, `send` sends a string, so express automatically sets the header `Content-Type` as `text/html` with status code `200`

```js
app.get('/api/notes', (request, response) => {
  response.json(notes)
});
```
- `json` method automatically changes JS objects into a JSON formatted string
- express automatically sets the `Content-Type` as `application/json`

## nodemon
- why nodemon? we want an automatic update of our code without shutting down and restart it
- but you need to reload the browser anyways; we don't have the hot reload functionality

## REST
- an architectural style meant for building scalable web applications
- how RESTful APIs are typically understood in web applications?
  - every resource is associated with its unique address URL
    - how to make a URL?: combine the name of the resource type with the resource's unique indentifier
    - example: `notes`(resource type) + `10`(unique identifire) = `/notes/10`

  - operations: GET, POST, PUT, PATCH, DELETE(the **HTTP verbs**)

- REST as a uniform interface: a consistent way of defining interfaces that makes it possible for systems to cooperate

- lots of debates on this topic going on

## Fetching a single resource
```js
app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id;
  const note = notes.find(note => note.id === Number(id));
  note 
  ? response.json(note)
  : response.status(404).end();
});
```
- defining parameters for routes
- parameters: basically string
- non-existing resources: should respond with 404 not found error

## Deleting resources
```js
app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter(note => note.id !== id);

  response.status(204).end();
});
```
- 204 no contents
- in fact, there is no consensus on what status code should be returned to a DELETE request if the resource does not exist

## Postman
- skim through this part

## The VS Code REST client
- skim through this part

## The WebStorm HTTP Client
- skim through this part

## Receiving Data
- POST request
- json-parser for easier data use: it takes the JSON data of a request, transform it into a JS object, and then attaches it to the `body` property of the `request` object, before the route handler is called
- for debugging, check `request.headers`

```js
app.post('/api/notes/', (request: Request<{}, {}, NoteType>, response) => {
  if (!request.body.content) {
    response.status(400).json({
      error: "content missing"
    })
    return;
  }

  const note = {
    content: request.body.content,
    important: request.body.important || false,
    date: String(new Date()),
    id: generateId()
  }
  notes = [...notes, note];

  response.json(note);
});
```
- status 400: bad request
- timestamp generated on the server side

## About HTTP request types
- HTTP standard's recommendations:
  - **safety**: GET/HEAD request must have no side effect on the server
  - **idempotent**: all requests but POST must be idempotent - if a request does generate side-effects, then the result should be the same regardless of how many times the request is sent

- POST is neither safe nor idempotent

## Middleware
- middleware: a collection of functions that can be used for handling `request` and `response` objects
- when you have more than one, those functions are executed one by one in the order that they were enrolled into the express app

```js
const exampleMiddleware = (req, res, next) => {
  // do sth with req, res

  next(); // this yields control to the next middleware
}

app.use(exampleMiddleware);
```
- therefore, middleware functions have to be taken into use before routes, if we want them to be executed
before the route event handlers are called
- middleware after the route: only called if no route handles the HTTP request