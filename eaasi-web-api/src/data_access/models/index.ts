const { lstatSync, readdirSync } = require('fs')
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
import { join } from 'path';
import { Sequelize } from 'sequelize-typescript';

const isDirectory = source => lstatSync(source).isDirectory();

const allSubdirectories = source =>
	readdirSync(source)
		.map(name => join(source, name))
		.filter(isDirectory);

export const sequelize = new Sequelize({
	database: config.database,
	username: config.username,
	password: config.password,
	dialect: config.dialect,
	models: [allSubdirectories(__dirname)]
});
