'use strict';

const Sequelize = require('sequelize');

class ContentEnvironment extends Sequelize.Model {}
module.exports = (sequelize) => {
	ContentEnvironment.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		contentEnvironmentID: {
			type: Sequelize.TEXT,
			allowNull: false,
		},
		contentEnvironment_computingEnvironmentID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'computingEnvironment',
				key: 'computingEnvironmentID'
			}
		},
		contentEnvironmentHelpText: {
			type: Sequelize.TEXT,
			allowNull: true
		}
	}, { sequelize, tableName: 'contentEnvironment' });
	return ContentEnvironment;
};
