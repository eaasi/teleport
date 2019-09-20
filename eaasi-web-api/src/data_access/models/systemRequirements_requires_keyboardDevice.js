'use strict';

const Sequelize = require('sequelize');

class SystemRequirementsRequiresKeyboardDevice extends Sequelize.Model {}
module.exports = (sequelize) => {
	SystemRequirementsRequiresKeyboardDevice.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		systemRequirements_systemRequirementsID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'systemRequirements',
				key: 'systemRequirementsID'
			}
		},
		systemRequirements_keyboardDeviceID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'keyboardDevice',
				key: 'keyboardDeviceID'
			}
		}
	}, { sequelize, tableName: 'systemRequirements_requires_keyboardDevice' });
	SystemRequirementsRequiresKeyboardDevice.associate = models => {
		models.SystemRequirementsRequiresKeyboardDevice.hasOne(models.SystemRequirements, {foreignKey: 'systemRequirementsID'});
		models.SystemRequirementsRequiresKeyboardDevice.hasOne(models.KeyboardDevice, {foreignKey: 'keyboardDeviceID'});
	};
	return SystemRequirementsRequiresKeyboardDevice;
};
