import mongoose from 'mongoose';

import * as logger from '../utils/logger';

export const connectDB = async (url: string) => {
  try {
    logger.info("connecting to the DB...");
    await mongoose.connect(url);
    logger.info("connect succeeded");
  } catch(error) {
    logger.error(`connection failed: ${error}`);
  }
}