const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
import { Sequelize } from 'sequelize-typescript';

const seq = new Sequelize({
	database: config.database,
	username: config.username,
	password: config.password,
	models: [__dirname]
});

seq.addModels([__dirname]);

export default seq;

