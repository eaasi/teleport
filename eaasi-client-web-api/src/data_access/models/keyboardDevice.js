'use strict';

const Sequelize = require('sequelize');

class KeyboardDevice extends Sequelize.Model {}
	module.exports = (sequelize) => {
	KeyboardDevice.init({
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

	KeyboardDevice.associate = models => {
		models.KeyboardDevice.hasOne(models.KeyboardLayout, {foreignKey: 'keyboardLayoutID'});
	};
}
