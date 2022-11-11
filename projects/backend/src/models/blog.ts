import { Schema, model } from 'mongoose';

// define data schema

const blogSchema = new Schema({
  title: {
    type: String,
    minLength: 3,
    required: true
  },
  author: {
    type: String,
  },
  url: {
    type: String,
    validator: /^https?:\/\/\w+/,
    required: true
  },
  likes: {
    type: Number,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

// define data transform function when we fetch data from the DB  
blogSchema.set('toJSON', ({
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
}));

// generate a new model
export const blogModel = model('Blog', blogSchema);
