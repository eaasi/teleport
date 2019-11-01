const { lstatSync, readdirSync } = require('fs')
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
import EaasiRole from '@/data_access/models/app/EaasiRole';
import EaasiUser from '@/data_access/models/app/EaasiUser';
import Emulator from '@/data_access/models/app/Emulator';
import Bookmark from '@/data_access/models/bookmark';
import { join } from 'path';
import { Sequelize } from 'sequelize-typescript';

const isDirectory = source => lstatSync(source).isDirectory();
const allSubdirectories = source => readdirSync(source).map(name => join(source, name)).filter(isDirectory);

const seq = new Sequelize({
	database: config.database,
	username: config.username,
	password: config.password,
	dialect: config.dialect,
});

seq.addModels([
	__dirname,
	// allSubdirectories(__dirname),
	Bookmark,
	EaasiUser,
	EaasiRole,
	Emulator,
]);

export default seq;
