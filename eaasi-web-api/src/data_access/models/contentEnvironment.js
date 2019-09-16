'use strict';

const Sequelize = require('sequelize');

class ContentEnvironment extends Sequelize.Model {}
module.exports = (sequelize) => {
	ContentEnvironment.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		objectEnvironment_objectEnvironment_computingEnvironmentID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'computingEnvironment',
				key: 'computingEnvironmentID'
			}
		},
		objectEnvironment_objectEnvironment_digitalObjectID: {
			type: Sequelize.INTEGER,
			allowNull: true,
			references: {
				model: 'digitalObject',
				key: 'digitalObjectID'
			}
		},
		objectEnvironment_concurrentInstances: {
			type: Sequelize.INTEGER,
			allowNull: true
		},
		objectEnvironmentName: {
			type: Sequelize.STRING,
			allowNull: true
		},
		objectEnvironmentDescription: {
			type: Sequelize.STRING,
			allowNull: true
		},
		objectEnvironmentHelpText: {
			type: Sequelize.TEXT,
			allowNull: true
		}
	}, { sequelize, tableName: 'objectEnvironment' });
	ContentEnvironment.associate = models => {
		models.ObjectEnvironment.hasOne(models.DigitalObject, {foreignKey: 'digitalObjectID'});
		models.ObjectEnvironment.hasOne(models.ComputingEnvironment, {foreignKey: 'computingEnvironmentID'});
	};
	return ContentEnvironment;
};
