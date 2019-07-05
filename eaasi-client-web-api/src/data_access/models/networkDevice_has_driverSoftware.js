'use strict';

import {NetworkDevice} from './networkDevice';
import {SoftwareVersion} from './softwareVersion';

const Sequelize = require('sequelize');

class NetworkDeviceHasDriverSoftware extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			networkDevice_networkDeviceID: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: 'networkDevice',
					key: 'networkDeviceID'
				}
			},
			driverSoftware_driverSoftware: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: 'softwareVersion',
					key: 'softwareVersionID'
				}
			}
		}, { sequelize, tableName: 'networkDevice_has_driverSoftware' });
	};

	static associate(models) {
		NetworkDeviceHasDriverSoftware.hasOne(NetworkDevice, {foreignKey: 'networkDeviceID'});
		NetworkDeviceHasDriverSoftware.hasOne(SoftwareVersion, {foreignKey: 'softwareVersionID'});
	}
};

module.exports = {
	NetworkDeviceHasDriverSoftware: NetworkDeviceHasDriverSoftware
};
