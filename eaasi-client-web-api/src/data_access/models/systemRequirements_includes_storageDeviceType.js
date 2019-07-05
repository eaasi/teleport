'use strict';

import {StorageDeviceType} from './storageDeviceType';
import {SystemRequirements} from './systemRequirements';

const Sequelize = require('sequelize');

class SystemRequirementsIncludesStorageDeviceType extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
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
	};

	static associate(models) {
		SystemRequirementsIncludesStorageDeviceType.hasOne(
			StorageDeviceType, {foreignKey: 'storageDeviceTypeID'});
		SystemRequirementsIncludesStorageDeviceType.hasOne(
			SystemRequirements, {foreignKey: 'systemRequirementsID'});
	}
}

module.exports = {
	SystemRequirementsIncludesStorageDeviceType : SystemRequirementsIncludesStorageDeviceType
};
