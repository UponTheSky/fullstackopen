import { connect } from 'mongoose';

import * as logger from '../utils/logger';

export const connectDB = async (url: string) => {
  try {
    logger.info("connecting to the DB...");
    connect(url);
    logger.info("connection has been successful");
  } catch(error) {
    logger.error(`connection has failed: ${error}`);
  }
}
