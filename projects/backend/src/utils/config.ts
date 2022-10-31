import dotenv from 'dotenv';

// run dotenv.config to make envinronment variables defined in .env file available globally
dotenv.config(); 

export const PORT = process.env.PORT || 3003;
export const MONGODB_URL = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_MONGODB_URL
  : process.env.MONGODB_URL;
  