'use strict';

const Sequelize = require('sequelize');

class SystemRequirementsIncludesSoftwareVersion extends Sequelize.Model {}
module.exports = (sequelize) => {
	SystemRequirementsIncludesSoftwareVersion.init({
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
		systemRequirements_softwareVersionID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'softwareVersion',
				key: 'softwareVersionID'
			}
		}
	}, { sequelize, tableName: 'systemRequirements_includes_softwareVersion' });
	SystemRequirementsIncludesSoftwareVersion.associate = models => {
		models.SystemRequirementsIncludesSoftwareVersion.hasOne(
			models.SystemRequirements, {foreignKey: 'systemRequirementsID'});

		models.SystemRequirementsIncludesSoftwareVersion.hasOne(
			models.SoftwareVersion, {foreignKey: 'softwareVersionID'});
	}

	return SystemRequirementsIncludesSoftwareVersion;
};
