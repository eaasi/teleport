'use strict';

const Sequelize = require('sequelize');

class Emulator extends Sequelize.Model {}

module.exports = (sequelize) => {
	Emulator.init({
		id: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		createdAt: {
			type: Sequelize.DATE,
			defaultValue: new Date()
		},
		updatedAt: {
			type: Sequelize.DATE,
			defaultValue: new Date()
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true
		}
	}, { sequelize, tableName: 'emulator' }
	);

	return Emulator;
};
