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
		systemRequirements_requiresOsVersionID: {
			type: Sequelize.INTEGER,
			allowNull: true,
			references: {
				model: 'osVersion',
				key: 'osVersionID'
			}
		}
	}, { sequelize, tableName: 'systemRequirements_requires_osVersion' });
	SystemRequirementsRequiresOsVersion.associate = models => {
		models.SystemRequirementsRequiresOsVersion.hasOne(
			models.SystemRequirements, {foreignKey: 'systemRequirementsID'});
		models.SystemRequirementsRequiresOsVersion.hasOne(
			models.OsVersion, {foreignKey: 'osVersionID'});
	};

	return SystemRequirementsRequiresOsVersion;
};
