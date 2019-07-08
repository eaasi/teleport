'use strict';

const Sequelize = require('sequelize');

class SystemRequirementsIncludesPointerDeviceType extends Sequelize.Model {}
module.exports = (sequelize) => {
	SystemRequirementsIncludesPointerDeviceType.init({
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
		systemRequirements_pointerDeviceTypeID: {
			type: Sequelize.INTEGER,
			allowNull: true,
			references: {
				model: 'pointerDevice',
				key: 'pointerDeviceID'
			}
		}
	}, { sequelize, tableName: 'systemRequirements_includes_pointerDeviceType' });
	SystemRequirementsIncludesPointerDeviceType.associate = models => {
		models.SystemRequirementsIncludesPointerDeviceType.hasOne(
			models.SystemRequirements, {foreignKey: 'systemRequirementsID'});
		models.SystemRequirementsIncludesPointerDeviceType.hasOne(
			models.PointerDeviceType, {foreignKey: 'pointerDeviceID'});
	};

	return SystemRequirementsIncludesPointerDeviceType;
}
