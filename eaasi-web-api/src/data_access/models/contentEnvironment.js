'use strict';

const Sequelize = require('sequelize');

class ContentEnvironment extends Sequelize.Model {}
module.exports = (sequelize) => {
	ContentEnvironment.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		contentEnvironmentID: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			allowNull: false,
		},
		contentEnvironment_computingEnvironmentID: {
			type: Sequelize.INTEGER,
			allowNull: true,
		},
		contentEnvironmentHelpText: {
			type: Sequelize.TEXT,
			allowNull: true
		}
	}, { sequelize, tableName: 'contentEnvironment' });
	return ContentEnvironment;
};
