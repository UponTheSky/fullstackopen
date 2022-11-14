import { Sequelize } from 'sequelize';

import { DB_USERNAME, DB_PASSWORD, DB_NAME } from '../utils/config';

export const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
  });

export const connectDB = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
}

export const closeDB = (): void => {
  sequelize && sequelize.close();
}
