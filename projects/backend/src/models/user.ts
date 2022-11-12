import mongoose, { Types } from 'mongoose';

// define schema
export interface UserType {
  username: string;
  id: Types.ObjectId;
}

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minLength: [3, 'username must consist of at least three characters'],
    required: true,
    unique: true
  },
  name: String,
  passwordHash: String,
  blogs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog'
  }]
});

// set toJSON method when the data from the db(document) is sent to the view through response.json
userSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  }
});

// define model
export const User = mongoose.model('User', userSchema); 
