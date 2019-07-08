'use strict';

const Sequelize = require('sequelize');

class KeyboardDeviceHasLanguage extends Sequelize.Model {}

	module.exports = (sequelize) => {
	KeyboardDeviceHasLanguage.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		keyboardDevice_keyboardDeviceID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'keyboardDevice',
				key: 'keyboardDeviceID'
			}
		},
		keyboardDevice_languageQID: {
			type: Sequelize.STRING,
			allowNull: false
		}
	}, { sequelize, tableName: 'ipuDevice_has_equivalent' });
	KeyboardDeviceHasLanguage.associate = models => {
		models.KeyboardDeviceHasLanguage.hasOne(models.KeyboardDevice, {foreignKey: 'keyboardDeviceID'});
	};
};
