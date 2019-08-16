'use strict';

const Sequelize = require('sequelize');

class ColorDepth extends Sequelize.Model {}

module.exports = (sequelize) => {
	ColorDepth.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		colorDepthID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		colorDepthName: {
			type: Sequelize.STRING,
			allowNull: false
		},
		bitDepth: {
			type: Sequelize.INTEGER,
			allowNull: true
		}
	},

	{
		sequelize,
		tableName: 'colorDepth'
	});

	return ColorDepth;
};
