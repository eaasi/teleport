'use strict';

const Sequelize = require('sequelize');

class StorageDeviceType extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
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
	};

	static associate(models) {
	}
};

module.exports = {
	StorageDeviceType: StorageDeviceType
};
