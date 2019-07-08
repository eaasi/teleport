'use strict';

const Sequelize = require('sequelize');

class KeyboardDeviceHasMachineInterface extends Sequelize.Model {}

module.exports = (sequelize) => {
	KeyboardDeviceHasMachineInterface.init({
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
	KeyboardDeviceHasMachineInterface.associate = models => {
		models.KeyboardDeviceHasMachineInterface.hasOne(models.KeyboardDevice, {foreignKey: 'keyboardDeviceID'});
	};
	return KeyboardDeviceHasMachineInterface;
};
