'use strict';

const Sequelize = require('sequelize');

class SystemRequirementsIncludesOsVersion extends Sequelize.Model {}
module.exports = (sequelize) => {
	SystemRequirementsIncludesOsVersion.init({
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
		systemRequirements_osVersionID: {
			type: Sequelize.INTEGER,
			allowNull: true,
			references: {
				model: 'osVersion',
				key: 'osVersionID'
			}
		}
	}, { sequelize, tableName: 'systemRequirements_includes_osVersion' });
	SystemRequirementsIncludesOsVersion.associate = models => {
		models.SystemRequirementsIncludesOsVersion.hasOne(
			models.SystemRequirements, {foreignKey: 'systemRequirementsID'});
		models.SystemRequirementsIncludesOsVersion.hasOne(
			models.OsVersion, {foreignKey: 'osVersionID'});
	}

	return SystemRequirementsIncludesOsVersion;
};
