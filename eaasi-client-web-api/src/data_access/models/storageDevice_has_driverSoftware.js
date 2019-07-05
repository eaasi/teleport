'use strict';

import {SoftwareVersion} from './softwareVersion';
import {StorageDevice} from './storageDevice';

const Sequelize = require('sequelize');

class StorageDeviceHasDriverSoftware extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			storageDevice_storageDeviceID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'storageDevice',
					key: 'storageDeviceID'
				}
			},
			storageDevice_driverSoftwareID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'softwareVersion',
					key: 'softwareVersionID'
				}
			}
		}, { sequelize, tableName: 'storageDevice_has_driverSoftware' });
	};

	static associate(models) {
		StorageDeviceHasDriverSoftware.hasOne(StorageDevice, {foreignKey: 'storageDeviceID'});
		StorageDeviceHasDriverSoftware.hasOne(SoftwareVersion, {foreignKey: 'softwareVersionID'});
	}
}

module.exports = {
	StorageDeviceHasDriverSoftware: StorageDeviceHasDriverSoftware
};
