'use strict';

const Sequelize = require('sequelize');

class SystemRequirementsRequiresPointerDeviceType extends Sequelize.Model {}
module.exports = (sequelize) => {
	SystemRequirementsRequiresPointerDeviceType.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		systemRequirements_systemRequirementsID: {
			type: Sequelize.STRING,
			allowNull: false,
			references: {
				model: 'systemRequirements',
				key: 'systemRequirementsID'
			}
		},
		systemRequirements_requiresPointerDeviceTypeID: {
			type: Sequelize.INTEGER,
			allowNull: true,
			references: {
				model: 'pointerDevice',
				key: 'pointerDeviceID'
			}
		}
	}, { sequelize, tableName: 'systemRequirements_requires_pointerDeviceType' });
	SystemRequirementsRequiresPointerDeviceType.associate = models => {
		models.SystemRequirementsRequiresPointerDeviceType.hasOne(
			models.SystemRequirements, {foreignKey: 'systemRequirementsID'});
		models.SystemRequirementsRequiresPointerDeviceType.hasOne(
			models.PointerDeviceType, {foreignKey: 'pointerDeviceID'});
	};

	return SystemRequirementsRequiresPointerDeviceType;
};
