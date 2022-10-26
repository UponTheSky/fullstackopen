"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const note_1 = require("./note");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/api/notes', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.default.STATES) {
        console.error("not connected yet");
        return;
    }
    const notes = yield note_1.Note.find({});
    response.json(notes);
}));
// app.get('/api/notes/:id', (request, response: Response<NoteType>) => {
//   const id = request.params.id;
//   const note = notes.find(note => note.id === Number(id));
//   note 
//   ? response.json(note)
//   : response.status(404).end();
// });
// app.delete('/api/notes/:id', (request, response) => {
//   const id = Number(request.params.id);
//   notes = notes.filter(note => note.id !== id);
//   response.status(204).end();
// });
app.post('/api/notes/', (request, response) => {
    if (!request.body.content) {
        return response.status(400).json({
            error: "content missing"
        });
    }
    // const note = {
    //   content: request.body.content,
    //   important: request.body.important || false,
    //   date: new Date(),
    //   id: generateId()
    // }
    // notes = [...notes, note];
    // response.json(note);
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Server running on port ${PORT}`);
}));
