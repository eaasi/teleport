'use strict';

const Sequelize = require('sequelize');

class ContentEnvironment extends Sequelize.Model {}
module.exports = (sequelize) => {
	ContentEnvironment.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		contentEnvironment_contentEnvironment_computingEnvironmentID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'computingEnvironment',
				key: 'computingEnvironmentID'
			}
		},
		contentEnvironment_contentEnvironment_digitalContentID: {
			type: Sequelize.INTEGER,
			allowNull: true,
			references: {
				model: 'digitalContent',
				key: 'digitalContentID'
			}
		},
		contentEnvironment_concurrentInstances: {
			type: Sequelize.INTEGER,
			allowNull: true
		},
		contentEnvironmentName: {
			type: Sequelize.STRING,
			allowNull: true
		},
		contentEnvironmentDescription: {
			type: Sequelize.STRING,
			allowNull: true
		},
		contentEnvironmentHelpText: {
			type: Sequelize.TEXT,
			allowNull: true
		}
	}, { sequelize, tableName: 'contentEnvironment' });
	ContentEnvironment.associate = models => {
		models.ContentEnvironment.hasOne(models.DigitalContent, {foreignKey: 'digitalContentID'});
		models.ContentEnvironment.hasOne(models.ComputingEnvironment, {foreignKey: 'computingEnvironmentID'});
	};
	return ContentEnvironment;
};
