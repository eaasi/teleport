'use strict';

import {KeyboardLayout} from './keyboardLayout';

const Sequelize = require('sequelize');

class KeyboardDevice extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			keyboardDeviceID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			keyboardDeviceQID: {
				type: Sequelize.STRING,
				allowNull: true
			},
			keyboardDeviceName: {
				type: Sequelize.STRING,
				allowNull: false
			},
			keyboardDevice_keyboardLayout: {
				type: Sequelize.STRING,
				allowNull: true,
				references: {
					model: 'keyboardLayout',
					key: 'keyboardLayoutQID'
				}
			}
		}, { sequelize, tableName: 'keyboardDevice' });
	};

	static associate(models) {
		KeyboardDevice.hasOne(KeyboardLayout, {foreignKey: 'keyboardLayoutID'});
	}
}

module.exports = {
	KeyboardDevice: KeyboardDevice
};
