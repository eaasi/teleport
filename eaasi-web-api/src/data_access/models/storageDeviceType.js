'use strict';

const Sequelize = require('sequelize');

class StorageDeviceType extends Sequelize.Model {}
module.exports = (sequelize) => {
	StorageDeviceType.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		storageDeviceTypeID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		storageDeviceTypeQID: {
			type: Sequelize.STRING,
			allowNull: true
		},
		storageDeviceTypeName: {
			type: Sequelize.STRING,
			allowNull: false
		}
	}, { sequelize, tableName: 'storageDeviceType' });
	return StorageDeviceType;
};
