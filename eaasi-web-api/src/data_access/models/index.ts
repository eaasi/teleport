const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
import Bookmark from '@/data_access/models/app/Bookmark';
import EaasiRole from '@/data_access/models/app/EaasiRole';
import EaasiUser from '@/data_access/models/app/EaasiUser';
import Emulator from '@/data_access/models/app/Emulator';
import { Sequelize } from 'sequelize-typescript';

export const sequelize = new Sequelize({
	database: config.database,
	username: config.username,
	password: config.password,
	dialect: config.dialect,
	models: [EaasiUser, EaasiRole, Emulator, Bookmark]
});
