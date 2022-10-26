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
// get the password from the commandline input
const arglen = process.argv.length;
if (arglen < 3) {
    console.log(`
    Please type in the password for connecting with the mongoDB Atlas service 
    - for listing data: node mongo.js <your_password>
    - for adding a new data object: node mongo.js <your_password> <person_name> <person_number>
  `);
    process.exit(1);
}
if (arglen !== 3 && arglen !== 5) {
    console.log(`
    Please type in the right form for running the following commands: 
    - for listing data: node mongo.js <your_password>
    - for adding a new data object: node mongo.js <your_password> <person_name> <person_number>
  `);
    process.exit(1);
}
const password = process.argv[2];
const database = 'fullstack';
const url = `mongodb+srv://fullstack:${password}@cluster0.nipffif.mongodb.net/${database}?retryWrites=true&w=majority`;
const personSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    number: { type: String, required: true }
});
// create a model
const Person = mongoose_1.default.model('Person', personSchema);
// operations
const savePerson = (url, person) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // connect to the DB
        yield mongoose_1.default.connect(url);
        console.log("connected to the mongoDB");
        // save the given JS object to the DB server
        const newPerson = new Person(person);
        yield newPerson.save();
        console.log("saving successful");
        // close the connection
        yield mongoose_1.default.connection.close();
        console.log("connection closed");
    }
    catch (error) {
        throw Error(`An error ocurred while saving the data: ${error}`);
    }
});
const listPersons = (url, options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // connect to the DB
        yield mongoose_1.default.connect(url);
        console.log("connected to the mongoDB");
        // find and list the data from the DB server
        const persons = yield Person.find(options);
        // print out the result
        console.log("phonebook: ");
        persons.forEach(({ name, number }) => {
            console.log(`${name} ${number}`);
        });
        // close the connection
        yield mongoose_1.default.connection.close();
        console.log("connection closed");
    }
    catch (error) {
        throw Error(`An error ocurred while finding the data: ${error}`);
    }
});
if (arglen === 3) {
    listPersons(url, {});
}
else {
    const name = process.argv[3];
    const number = process.argv[4];
    savePerson(url, { name, number });
}
