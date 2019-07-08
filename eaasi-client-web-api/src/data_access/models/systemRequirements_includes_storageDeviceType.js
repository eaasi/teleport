'use strict';

const Sequelize = require('sequelize');

class SystemRequirementsIncludesStorageDeviceType extends Sequelize.Model {}
	module.exports = (sequelize) => {
	SystemRequirementsIncludesStorageDeviceType.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		systemRequirements_systemRequirementsID: {
			type: Sequelize.INTEGER,
			allowNull: true,
			references: {
				model: 'systemRequirements',
				key: 'systemRequirementsID'
			}
		},
		systemRequirements_storageDeviceTypeID: {
			type: Sequelize.INTEGER,
			allowNull: true,
			references: {
				model: 'storageDeviceType',
				key: 'storageDeviceTypeID'
			}
		}
	}, { sequelize, tableName: 'pointerDevice' });
	SystemRequirementsIncludesStorageDeviceType.associate = models => {
		models.SystemRequirementsIncludesStorageDeviceType.hasOne(
			models.StorageDeviceType, {foreignKey: 'storageDeviceTypeID'});
		models.SystemRequirementsIncludesStorageDeviceType.hasOne(
			models.SystemRequirements, {foreignKey: 'systemRequirementsID'});
	};

	return SystemRequirementsIncludesStorageDeviceType;
}
