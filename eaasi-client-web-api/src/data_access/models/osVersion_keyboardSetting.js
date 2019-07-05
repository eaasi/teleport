import {OsVersion} from './osVersion';
import {KeyboardLayout} from './keyboardLayout';

const Sequelize = require('sequelize');

class OsVersionKeyboardSetting extends Sequelize.Model {
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
		}, { sequelize, tableName: 'osVersion_keyboardSetting' });
	};

	static associate(models) {
		OsVersionKeyboardSetting.hasOne(OsVersion, {foreignKey: 'osVersionID'});
		OsVersionKeyboardSetting.hasOne(KeyboardLayout, {foreignKey: 'keyboardLayoutQID'});
	}
};

module.exports = {
	OsVersionKeyboardSetting: OsVersionKeyboardSetting
};
