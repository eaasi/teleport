'use strict';

const Sequelize = require('sequelize');

class SystemRequirementsRequiresOsVersion extends Sequelize.Model {}
module.exports = (sequelize) => {
	SystemRequirementsRequiresOsVersion.init({
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
		systemRequirements_requiresOSVersionID: {
			type: Sequelize.STRING,
			allowNull: true,
		}
	}, { sequelize, tableName: 'systemRequirements_requires_osVersion' });
	SystemRequirementsRequiresOsVersion.associate = models => {
		models.SystemRequirementsRequiresOsVersion.hasOne(
			models.SystemRequirements, {foreignKey: 'systemRequirementsID'});
	};

	return SystemRequirementsRequiresOsVersion;
};
