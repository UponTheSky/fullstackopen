import mongoose from "mongoose";

import { PersonType } from "./types";

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
const database = 'fullstack'
const url = `mongodb+srv://fullstack:${password}@cluster0.nipffif.mongodb.net/${database}?retryWrites=true&w=majority`;

// set a schema for Person data
// see for use with TS: https://mongoosejs.com/docs/typescript.html

type DBPersonType = Omit<PersonType, 'id'>;
const personSchema = new mongoose.Schema<DBPersonType>({
  name: { type: String, required: true },
  number: { type: String, required: true }
});

// create a model
const Person = mongoose.model<DBPersonType>('Person', personSchema);

// operations
const savePerson = async (url: string, person: DBPersonType) => {
  try {
    // connect to the DB
    await mongoose.connect(url);
    console.log("connected to the mongoDB");
    
    // save the given JS object to the DB server
    const newPerson = new Person(person);
    await newPerson.save();
    console.log("saving successful");

    // close the connection
    await mongoose.connection.close();
    console.log("connection closed");
  } catch (error) {
    throw Error(`An error ocurred while saving the data: ${error}`);
  }
}

const listPersons = async (url: string, options: Partial<DBPersonType>) => {
  try {
    // connect to the DB
    await mongoose.connect(url);
    console.log("connected to the mongoDB");
    
    // find and list the data from the DB server
    const persons = await Person.find<PersonType>(options);
    
    // print out the result
    console.log("phonebook: ");
    persons.forEach(({ name, number }) => {
      console.log(`${name} ${number}`)
    });
    
    // close the connection
    await mongoose.connection.close();
    console.log("connection closed");
  } catch (error) {
    throw Error(`An error ocurred while finding the data: ${error}`);
  }
}

if (arglen === 3) {
  listPersons(url, {});
} else {
  const name = process.argv[3];
  const number = process.argv[4];
  savePerson(url, { name, number });
}
