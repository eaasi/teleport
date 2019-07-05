import {OsVersion} from './osVersion';
import {KeyboardLayout} from './keyboardLayout';

const Sequelize = require('sequelize');

class OsVersionKeyboardLayoutSettings extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			osVersion_osVersionID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'osVersion',
					key: 'osVersionID'
				}
			},
			osVersion_keyboardLayoutQID: {
				type: Sequelize.STRING,
				allowNull: false,
				references: {
					model: 'keyboardLayout',
					key: 'keyboardLayoutQID'
				}
			},
			osVersion_keyboardLayoutName: {
				type: Sequelize.STRING,
				allowNull: true
			}
		}, { sequelize, tableName: 'osVersion_keyboardLayoutSettings' });
	};

	static associate(models) {
		OsVersionKeyboardLayoutSettings.hasOne(OsVersion, {foreignKey: 'osVersionID'});
		OsVersionKeyboardLayoutSettings.hasOne(KeyboardLayout, {foreignKey: 'keyboardLayoutQID'});
	}
};

module.exports = {
	OsVersionKeyboardLayoutSettings: OsVersionKeyboardLayoutSettings
};
