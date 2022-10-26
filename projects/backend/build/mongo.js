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
const mongoose_1 = __importDefault(require("mongoose"));
// setup the url via commandline input(password)
if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>');
    process.exit(1);
}
const password = process.argv[2];
const url = `mongodb+srv://fullstack:${password}@cluster0.nipffif.mongodb.net/fullstack?retryWrites=true&w=majority`;
let notes = [
    {
        content: "HTML is easy",
        date: new Date("2022-05-30T17:30:31.098Z"),
        important: true
    },
    {
        content: "Browser can execute only Javascript",
        date: new Date("2022-05-30T18:39:34.091Z"),
        important: false
    },
    {
        content: "GET and POST are the most important methods of HTTP protocol",
        date: new Date("2022-05-30T19:20:14.298Z"),
        important: true
    }
];
// define data schema and model
const noteSchema = new mongoose_1.default.Schema({
    content: String,
    date: Date,
    important: Boolean
});
const Note = mongoose_1.default.model('Note', noteSchema);
// define functions for DB operations
const save = (url, note) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // connect to the DB
        console.log("connecting to the DB...");
        yield mongoose_1.default.connect(url);
        console.log("connected");
        // generate a new note to be saved
        const newNote = new Note(note);
        const result = yield newNote.save();
        if (result) {
            console.log("note saved");
        }
        yield mongoose_1.default.connection.close();
    }
    catch (error) {
        throw Error(`an error occurred: ${error}`);
    }
});
save(url, notes[0]);
const fetch = (url, options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // connect to the DB
        yield mongoose_1.default.connect(url);
        console.log("connected");
        // fetch notes from the DB
        const fetched = yield Note.find(options);
        fetched.forEach(note => console.log(note));
        yield mongoose_1.default.connection.close();
    }
    catch (error) {
        throw Error(`an error occurred: ${error}`);
    }
});
// fetch(url, {});
