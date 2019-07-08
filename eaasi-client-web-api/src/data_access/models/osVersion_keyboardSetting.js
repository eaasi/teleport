'use strict'

const Sequelize = require('sequelize');

class OsVersionKeyboardSetting extends Sequelize.Model {}
module.exports = (sequelize) => {
	OsVersionKeyboardSetting.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		osVersion_keyboardSettingLanguage: {
			type: Sequelize.STRING,
			allowNull: false
		},
		osVersion_keyboardSettingName: {
			type: Sequelize.STRING,
			allowNull: true
		},
		osVersion_osVersionID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'osVersion',
				key: 'osVersionID'
			}
		},
		osVersion_keyboardSettingLayout: {
			type: Sequelize.STRING,
			allowNull: true,
			references: {
				model: 'keyboardLayout',
				key: 'keyboardLayoutQID'
			}
		}
	}, { sequelize, tableName: 'osVersion_keyboardSetting' });
	OsVersionKeyboardSetting.associate = models => {
		models.OsVersionKeyboardSetting.hasOne(models.OsVersion, {foreignKey: 'osVersionID'});
		models.OsVersionKeyboardSetting.hasOne(models.KeyboardLayout, {foreignKey: 'keyboardLayoutQID'});
	}
	return OsVersionKeyboardSetting;
};
