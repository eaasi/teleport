'use strict';

const Sequelize = require('sequelize');

class SystemRequirementsIncludesCpuArchitecture extends Sequelize.Model {}
module.exports = (sequelize) => {
	SystemRequirementsIncludesCpuArchitecture.init({
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
		systemRequirements_cpuArchitecture: {
			type: Sequelize.STRING,
			allowNull: true,
			references: {
				model: 'cpuArchitecture',
				key: 'cpuArchitectureQID'
			}
		}
	}, { sequelize, tableName: 'systemRequirements_includes_cpuArchitecture' });
	SystemRequirementsIncludesCpuArchitecture.associate = models => {
		models.SystemRequirementsIncludesCpuArchitecture.hasOne(
			models.SystemRequirements, {foreignKey: 'systemRequirementsID'});
		models.SystemRequirementsIncludesCpuArchitecture.hasOne(
			models.CpuArchitecture, {foreignKey: 'cpuArchitectureQID'});
	}
	return SystemRequirementsIncludesCpuArchitecture;
};
