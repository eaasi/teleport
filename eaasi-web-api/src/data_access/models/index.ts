const { lstatSync, readdirSync } = require('fs')
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
import { join } from 'path';
import { Sequelize } from 'sequelize-typescript';

const isDirectory = source => lstatSync(source).isDirectory();
const allSubdirectories = source => readdirSync(source).map(name => join(source, name)).filter(isDirectory);

const seq = new Sequelize({
	database: config.database,
	username: config.username,
	password: config.password,
	models: [__dirname]
});

seq.addModels([__dirname, allSubdirectories(__dirname)]);

export default seq;
