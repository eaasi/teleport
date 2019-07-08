'use strict';

const Sequelize = require('sequelize');

class StorageDeviceHasMachineInterface extends Sequelize.Model {}
module.exports = (sequelize) => {
	StorageDeviceHasMachineInterface.init({
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
	}, { sequelize, tableName: 'storageDevice_has_machineInterface' });
	StorageDeviceHasMachineInterface.associate = models => {
		models.StorageDeviceHasMachineInterface.hasOne(models.StorageDevice, {foreignKey: 'storageDeviceID'});
	};
	return StorageDeviceHasMachineInterface;
}
