'use strict';

const Sequelize = require('sequelize');

class KeyboardDeviceHasDriverSoftware extends Sequelize.Model {}

module.exports = (sequelize) => {
	KeyboardDeviceHasDriverSoftware.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		keyboardDevice_keyboardDeviceID: {
			type: Sequelize.INTEGER,
			allowNull: true,
			references: {
				model: 'keyboardDevice',
				key: 'keyboardDeviceID'
			}
		},
		keyboardDevice_driverSoftware: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'softwareVersion',
				key: 'softwareVersionID'
			}
		}
	}, { sequelize, tableName: 'ipuDevice_has_equivalent' });

	KeyboardDeviceHasDriverSoftware.associate = models => {
		models.KeyboardDeviceHasDriverSoftware.hasOne(models.KeyboardDevice, {foreignKey: 'keyboardDeviceID'});
		models.KeyboardDeviceHasDriverSoftware.hasOne(models.SoftwareVersion, {foreignKey: 'softwareVersionID'});
	};

	return KeyboardDeviceHasDriverSoftware;
};
