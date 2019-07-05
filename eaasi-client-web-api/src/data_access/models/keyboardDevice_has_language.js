'use strict';

import {KeyboardDevice} from './keyboardDevice';

const Sequelize = require('sequelize');

class KeyboardDeviceHasLanguage extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
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
	};

	static associate(models) {
		KeyboardDeviceHasLanguage.hasOne(KeyboardDevice, {foreignKey: 'keyboardDeviceID'});
	}
};

module.exports = {
	KeyboardDeviceHasLanguage: KeyboardDeviceHasLanguage
};
