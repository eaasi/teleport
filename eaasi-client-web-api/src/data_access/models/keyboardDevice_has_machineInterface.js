'use strict';

import {KeyboardDevice} from './keyboardDevice';

const Sequelize = require('sequelize');

class KeyboardDeviceHasMachineInterface extends Sequelize.Model {
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
			keyboardDevice_machineInterfaceID: {
				type: Sequelize.INTEGER,
				allowNull: false
			}
		}, { sequelize, tableName: 'keyboardDevice_has_machineInterface' });
	};

	static associate(models) {
		KeyboardDeviceHasMachineInterface.hasOne(KeyboardDevice, {foreignKey: 'keyboardDeviceID'});
	}
};

module.exports = {
	KeyboardDeviceHasMachineInterface: KeyboardDeviceHasMachineInterface
};
