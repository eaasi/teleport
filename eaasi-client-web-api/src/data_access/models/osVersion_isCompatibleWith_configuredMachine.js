'use strict';

const Sequelize = require('sequelize');

class OsVersionIsCompatibleWithConfiguredMachine extends Sequelize.Model {}
	module.exports = (sequelize) => {
	OsVersionIsCompatibleWithConfiguredMachine.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		osVersion_osVersionID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'osVersion',
				key: 'osVersionID'
			}
		},
		compatibleMachineID: {
			type: Sequelize.INTEGER,
			allowNull: true,
			references: {
				model: 'configuredMachine',
				key: 'configuredMachineID'
			}
		}
	}, { sequelize, tableName: 'osVersion_isCompatibleWith_configuredMachine' });
	OsVersionIsCompatibleWithConfiguredMachine.associate = models => {
		models.OsVersionIsCompatibleWithConfiguredMachine.hasOne(models.OsVersion, {foreignKey: 'osVersionID'});
		models.OsVersionIsCompatibleWithConfiguredMachine.hasOne(models.ConfiguredMachine, {foreignKey: 'configuredMachineID'});
	};
	return OsVersionIsCompatibleWithConfiguredMachine;
};
