"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const hardcode_data_1 = require("./hardcode_data");
const generateId_1 = require("./utils/generateId");
let persons = hardcode_data_1.personsData;
// create an app & middlewares
const app = (0, express_1.default)();
app.use(express_1.default.json()); // for parsing incoming request.body data
app.use((0, morgan_1.default)((tokens, req, res) => {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        req.method === 'POST' ? JSON.stringify(req.body) : ''
    ].join(' ');
}));
// routers
app.get('/info', (_, response) => {
    const message = `
    Phonebook has info for ${persons.length} people\n
    ${String(new Date())}
  `;
    response.send(message);
});
app.get('/api/persons', (_, response) => {
    response.json(persons);
});
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find(person => person.id === id);
    if (!person) {
        response.status(404).end();
        return;
    }
    response.json(person);
});
app.post('/api/persons', (request, response) => {
    const body = request.body;
    if (!body.name || !body.number) {
        response.status(400).json({
            error: 'content missing',
        });
        return;
    }
    const personAlready = persons.find(person => person.name == body.name);
    if (personAlready) {
        response.status(400).json({
            error: 'name must be unique'
        });
        return;
    }
    const newPerson = {
        name: body.name,
        number: body.number,
        id: (0, generateId_1.generateId)()
    };
    persons = [...persons, newPerson];
    response.json(newPerson);
});
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter(person => person.id !== id);
    console.log(persons);
    response.status(204).end();
});
// start the app
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`The server running on port ${PORT}`);
});
