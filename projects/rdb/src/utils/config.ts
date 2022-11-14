import dotenv from 'dotenv';

dotenv.config();

export const DB_USERNAME = process.env.MYSQL_USERNAME as string;
export const DB_PASSWORD = process.env.MYSQL_PASSWORD as string;
export const DB_NAME = process.env.MYSQL_DB_NAME as string;
export const PORT = process.env.PORT || 3003;

export const SECRET = process.env.SECRET as string;
