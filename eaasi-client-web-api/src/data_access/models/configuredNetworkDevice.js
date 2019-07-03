'use strict';

import {ConfiguredMachine} from './configuredMachine';
import {NetworkDevice} from './networkDevice';

const Sequelize = require('sequelize');

class ConfiguredNetworkDevice extends Sequelize.Model {
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
	};

	static associate(models) {
		ConfiguredNetworkDevice.hasOne(ConfiguredMachine, {foreignKey: 'configuredMachineID'});
		ConfiguredNetworkDevice.hasOne(NetworkDevice, {foreignKey: 'networkDeviceID'});
	}
};

module.exports = {
	ConfiguredNetworkDevice: ConfiguredNetworkDevice
};
