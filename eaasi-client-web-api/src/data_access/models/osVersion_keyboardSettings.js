import {OsVersion} from './osVersion';
import {KeyboardLayout} from './keyboardLayout';

const Sequelize = require('sequelize');

class OsVersionKeyboardLayoutSettings extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
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
		}, { sequelize, tableName: 'osVersion_keyboardSettings' });
	};

	static associate(models) {
		OsVersionKeyboardLayoutSettings.hasOne(OsVersion, {foreignKey: 'osVersionID'});
		OsVersionKeyboardLayoutSettings.hasOne(KeyboardLayout, {foreignKey: 'keyboardLayoutQID'});
	}
};

module.exports = {
	OsVersionKeyboardLayoutSettings: OsVersionKeyboardLayoutSettings
};
