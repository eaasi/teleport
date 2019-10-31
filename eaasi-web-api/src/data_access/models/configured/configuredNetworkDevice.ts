'use strict';

const Sequelize = require('sequelize');

class ConfiguredNetworkDevice extends Sequelize.Model {}

module.exports = (sequelize) => {
	ConfiguredNetworkDevice.init({
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
		configuredNetworkDevice_networkDeviceID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'networkDevice',
				key: 'networkDeviceID'
			}
		},
		configuredNetworkDevice_macAddress: {
			type: Sequelize.INTEGER,
			allowNull: true
		},
		configuredNetworkDevice_usesMachineInterface: {
			type: Sequelize.INTEGER,
			allowNull: true
		}
	}, { sequelize, tableName: 'configuredNetworkDevice' });

	ConfiguredNetworkDevice.associate = models => {
		models.ConfiguredNetworkDevice.hasOne(models.ConfiguredMachine, {foreignKey: 'configuredMachineID'});
		models.ConfiguredNetworkDevice.hasOne(models.NetworkDevice, {foreignKey: 'networkDeviceID'});
	};
	return ConfiguredNetworkDevice;
};
