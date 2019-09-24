'use strict';

const Sequelize = require('sequelize');

class Chipset extends Sequelize.Model {}

module.exports = (sequelize) => {
	Chipset.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		chipsetID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		chipsetQID: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		chipsetLabel: {
			type: Sequelize.STRING(64),
			allowNull: false
		},
	},

	{
		sequelize,
		tableName: 'chipset'
	});

	return Chipset;
};
