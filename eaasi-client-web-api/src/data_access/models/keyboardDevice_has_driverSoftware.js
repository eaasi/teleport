'use strict';

import {SoftwareVersion} from './softwareVersion';
import {KeyboardDevice} from './keyboardDevice';

const Sequelize = require('sequelize');

class KeyboardDeviceHasDriverSoftware extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			keyboardDevice_keyboardDeviceID: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: 'keyboardDevice',
					key: 'keyboardDeviceID'
				}
			},
			keyboardDevice_driverSoftware: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'softwareVersion',
					key: 'softwareVersionID'
				}
			}
		}, { sequelize, tableName: 'ipuDevice_has_equivalent' });
	};

	static associate(models) {
		KeyboardDeviceHasDriverSoftware.hasOne(KeyboardDevice, {foreignKey: 'keyboardDeviceID'});
		KeyboardDeviceHasDriverSoftware.hasOne(SoftwareVersion, {foreignKey: 'softwareVersionID'});
	}
};

module.exports = {
	KeyboardDeviceHasDriverSoftware: KeyboardDeviceHasDriverSoftware
};
