const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];

import ApplicationLog from '@/data_access/models/app/ApplicationLog';
import Bookmark from '@/data_access/models/app/Bookmark';
import EaasiRole from '@/data_access/models/app/EaasiRole';
import EaasiUser from '@/data_access/models/app/EaasiUser';
import Emulator from '@/data_access/models/app/Emulator';
import ImportedSoftwareResource from '@/data_access/models/app/ImportedSoftwareResource';
import { Sequelize } from 'sequelize-typescript';

export const sequelize = new Sequelize({
	host: config.host,
	database: config.database,
	username: config.username,
	password: config.password,
	dialect: config.dialect,
	models: [
		// App
		ApplicationLog,
		Bookmark,
		EaasiRole,
		EaasiUser,
		Emulator,
		ImportedSoftwareResource,
	]
});
