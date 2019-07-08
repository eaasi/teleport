'use strict';

const Sequelize = require('sequelize');

class ConfiguredMachineHasEvent extends Sequelize.Model {}
module.exports = (sequelize) => {
	ConfiguredMachineHasEvent.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		configuredMachine_machineID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'configuredMachine',
				key: 'configuredMachineID'
			}
		},
		event_eventID: {
			type: Sequelize.INTEGER,
			allowNull: true
		}
	}, { sequelize, tableName: 'computingEnvironment' });
	ConfiguredMachineHasEvent.associate = models => {
		models.ConfiguredMachineHasEvent.hasOne(models.ConfiguredMachine, {foreignKey: 'configuredMachineID'});
	}
	return ConfiguredMachineHasEvent;
};
