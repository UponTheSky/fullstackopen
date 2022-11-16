import { Sequelize, QueryInterface } from 'sequelize';
import { Umzug, UmzugOptions, SequelizeStorage } from 'umzug';
import path from 'path';

import { DB_USERNAME, DB_PASSWORD, DB_NAME } from '../utils/config';

export const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
  });

const migrationConf: UmzugOptions<QueryInterface> = {
  migrations: {
    glob: ['migrations/*.js', { cwd: path.resolve(__dirname, '..') }]
  },
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations'}),
  context: sequelize.getQueryInterface(),
  logger: console,
}

const runMigrations = async () => {
  const migrator = new Umzug(migrationConf);

  const migrations = await migrator.up();
  console.log("Migrations up to date", {
    files: migrations.map(mig => mig.name)
  })
}

export const rollbackMigration = async () => {
  await sequelize.authenticate();
  const migrator = new Umzug(migrationConf);
  await migrator.down();
}

export const connectDB = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    await runMigrations();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
}

export const closeDB = (): void => {
  sequelize && sequelize.close();
}
