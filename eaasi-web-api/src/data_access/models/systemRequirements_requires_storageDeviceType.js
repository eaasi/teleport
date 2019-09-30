'use strict';

const Sequelize = require('sequelize');

class SystemRequirementsRequiresStorageDeviceType extends Sequelize.Model {}
module.exports = (sequelize) => {
	SystemRequirementsRequiresStorageDeviceType.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		systemRequirements_systemRequirementsID: {
			type: Sequelize.STRING,
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
	SystemRequirementsRequiresStorageDeviceType.associate = models => {
		models.SystemRequirementsRequiresStorageDeviceType.hasOne(
			models.StorageDeviceType, {foreignKey: 'storageDeviceTypeID'});
		models.SystemRequirementsRequiresStorageDeviceType.hasOne(
			models.SystemRequirements, {foreignKey: 'systemRequirementsID'});
	};

	return SystemRequirementsRequiresStorageDeviceType;
};
