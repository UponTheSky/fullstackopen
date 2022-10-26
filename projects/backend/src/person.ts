import mongoose from 'mongoose';

import { PersonType } from './types';

// define the schema
export type DBPersonType = Omit<PersonType, 'id'>;

const personSchema = new mongoose.Schema<DBPersonType>({
  name: { type: String, required: true },
  number: { type: String, required: true }
});

// define the toJSON method for data postprocessing
personSchema.set('toJSON', ({
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
}));

// create the model and export
export const PersonModel = mongoose.model('Person', personSchema);

// connect to the database server
const connectDB = async (url: string) => {
  try {
    await mongoose.connect(url);
    console.log("successful connection to the mongoDB server");
  } catch(error) {
    throw Error(`connection to the mongoDB server has failed: ${error}`);
  }
}

const url = process.env.MONGODB_URL;
url && connectDB(url);
