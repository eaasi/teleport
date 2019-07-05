'use strict';

import {StorageDevice} from './storageDevice';

const Sequelize = require('sequelize');

class StorageDeviceHasMachineInterface extends Sequelize.Model {
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
			storageDevice_machineInterfaceID: {
				type: Sequelize.INTEGER,
				allowNull: false
			}
		}, { sequelize, tableName: 'pointerDevice' });
	};

	static associate(models) {
		StorageDeviceHasMachineInterface.hasOne(StorageDevice, {foreignKey: 'storageDeviceID'});
	}
}

module.exports = {
	StorageDeviceHasMachineInterface : StorageDeviceHasMachineInterface
};
