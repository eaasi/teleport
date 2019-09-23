'use strict';

const Sequelize = require('sequelize');

class SystemRequirementsRequiresSoftwareVersion extends Sequelize.Model {}
module.exports = (sequelize) => {
	SystemRequirementsRequiresSoftwareVersion.init({
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
		systemRequirements_softwareVersionID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'softwareVersion',
				key: 'softwareVersionID'
			}
		}
	}, { sequelize, tableName: 'systemRequirements_requires_softwareVersion' });
	SystemRequirementsRequiresSoftwareVersion.associate = models => {
		models.SystemRequirementsRequiresSoftwareVersion.hasOne(
			models.SystemRequirements, {foreignKey: 'systemRequirementsID'});

		models.SystemRequirementsRequiresSoftwareVersion.hasOne(
			models.SoftwareVersion, {foreignKey: 'softwareVersionID'});
	};

	return SystemRequirementsRequiresSoftwareVersion;
};
