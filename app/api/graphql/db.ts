import { DataTypes, Sequelize } from 'sequelize';
import config from '@/app/db/config/config.json';
import inventory from '@/app/db/models/inventory';
import order from '@/app/db/models/order';

const env = process.env.NODE_ENV || 'development';
const uri = config[env].url;

export const sequelize = new Sequelize(uri, { dialect: 'postgres' });

export const checkDBConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await inventory(sequelize, DataTypes).sync();
    await order(sequelize, DataTypes).sync();
  } catch (error) {
    console.error(error);
  }
};
