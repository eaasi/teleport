'use strict';

import {OsVersion} from './osVersion';

const Sequelize = require('sequelize');

class OsVersionKeyboardLanguageSettings extends Sequelize.Model {
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
			osVersion_keyboardLanguageQID: {
				type: Sequelize.STRING,
				allowNull: false
			}
		}, { sequelize, tableName: 'osVersion_displayResolutionSettings' });
	};

	static associate(models) {
		OsVersionKeyboardLanguageSettings.hasOne(OsVersion, {foreignKey: 'osVersionID'});
	}
};

module.exports = {
	OsVersionKeyboardLanguageSettings: OsVersionKeyboardLanguageSettings
};
