'use strict';

import {ConfiguredMachine} from './configuredMachine';

const Sequelize = require('sequelize');

class ConfiguredPointerDevice extends Sequelize.Model {
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
			configuredPointerDevice_pointerDeviceID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'pointerDevice',
					key: 'pointerDeviceID'
				}
			},
			configuredPointerDevice_usesMachineInterface: {
				type: Sequelize.INTEGER,
				allowNull: false
			}
		}, { sequelize, tableName: 'configuredNetwork' });
	};

	static associate(models) {
		ConfiguredPointerDevice.hasOne(ConfiguredMachine);
	}
};

module.exports = {
	ConfiguredPointerDevice:ConfiguredPointerDevice
};
