'use strict';

const Sequelize = require('sequelize');

class ConfiguredPointerDevice extends Sequelize.Model {}
module.exports = (sequelize) => {
	ConfiguredPointerDevice.init({
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
	}, {sequelize, tableName: 'configuredNetwork'});
	ConfiguredPointerDevice.associate = models => {

		models.ConfiguredPointerDevice.hasOne(models.ConfiguredMachine);
	};
	return ConfiguredPointerDevice;
};
