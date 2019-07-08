'use strict';

const Sequelize = require('sequelize');

class DisplayResolution extends Sequelize.Model {}
module.exports = (sequelize) => {
	DisplayResolution.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		displayResolutionID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		displayResolutionName: {
			type: Sequelize.STRING,
			allowNull: false
		}
	}, { sequelize, tableName: 'displayResolution' });
	return DisplayResolution;
}
