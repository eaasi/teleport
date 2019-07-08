'use strict';

const Sequelize = require('sequelize');

class SoftwareEnvironment extends Sequelize.Model {}
	module.exports = (sequelize) => {
	SoftwareEnvironment.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		softwareEnvironmentID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		softwareEnvironmentName: {
			type: Sequelize.STRING,
			allowNull: true
		},
		softwareEnvironmentDescription: {
			type: Sequelize.STRING,
			allowNull: true
		},
		softwareEnvironmentHelpText: {
			type: Sequelize.TEXT,
			allowNull: true
		},
		derivedFrom_softwareEnvironment: {
			type: Sequelize.INTEGER,
			allowNull: true,
			references: {
				model: 'softwareEnvironment',
				key: 'softwareEnvironmentID'
			}
		},
		softwareEnvironment_hasPart_configuredOS: {
			type: Sequelize.INTEGER,
			allowNull: true,
			references: {
				model: 'configuredOS',
				key: 'configuredOperatingSystemID'
			}
		}
	}, { sequelize, tableName: 'softwareEnvironment' });
	SoftwareEnvironment.associate = models => {
		models.SoftwareEnvironment.hasOne(models.ConfiguredOS, {foreignKey: 'configuredOperatingSystemID'});
		models.SoftwareEnvironment.hasOne(models.SoftwareEnvironment, {foreignKey: 'softwareEnvironmentID'});
	};

	return SoftwareEnvironment;
};
