import { Model, DataType, DataTypes } from 'sequelize';

import { sequelize } from '../lib/db';

export class Session extends Model {};

Session.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  timestamps: false,
  underscored: true,
  modelName: 'session'
});
