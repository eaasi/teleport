'use strict';

const Sequelize = require('sequelize');

class ComputingEnvironment extends Sequelize.Model {}

module.exports = (sequelize) => {
	ComputingEnvironment.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		computingEnvironmentID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		computingEnvironment_hasSourceOrg: {
			type: Sequelize.INTEGER,
			allowNull: true
		},
		computingEnvironment_inNetwork: {
			type: Sequelize.BOOLEAN,
			allowNull: true
		},
		computingEnvironment_configuredNetworkID: {
			type: Sequelize.INTEGER,
			allowNull: true,
			references: {
				model: 'configuredNetwork',
				key: 'configuredNetworkID'
			}
		},
		computingEnvironment_softwareEnvironmentID: {
			type: Sequelize.INTEGER,
			allowNull: true,
			references: {
				model: 'softwareEnvironment',
				key: 'softwareEnvironmentID'
			}
		}
	},
	{
		sequelize, tableName: 'computingEnvironment'
	});

	ComputingEnvironment.associate = models => {
		models.ComputingEnvironment.hasOne(models.SoftwareEnvironment, {foreignKey: 'softwareEnvironmentID'});
		models.ComputingEnvironment.hasOne(models.ConfiguredNetwork, {foreignKey: 'configuredNetworkID'});
	};

	return ComputingEnvironment;
};
