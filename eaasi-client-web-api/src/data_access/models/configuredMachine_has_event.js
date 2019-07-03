'use strict';

import {ConfiguredMachine} from './complete/configuredMachine';

const Sequelize = require('sequelize');

class ConfiguredMachineHasEvent extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
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
	};

	static associate(models) {
		ConfiguredMachineHasEvent.hasOne(ConfiguredMachine, {foreignKey: 'configuredMachineID'});
	}
}

module.exports = {
	ConfiguredMachine: ConfiguredMachine
};
