'use strict';

const Sequelize = require('sequelize');

class SystemRequirementsIncludesMachineType extends Sequelize.Model {}
module.exports = (sequelize) => {
	SystemRequirementsIncludesMachineType.init({
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
		systemRequirements_machineTypeID: {
			type: Sequelize.INTEGER,
			allowNull: true,
			references: {
				model: 'machineType',
				key: 'machineTypeID'
			}
		}
	}, { sequelize, tableName: 'systemRequirements_includes_machineType' });
	SystemRequirementsIncludesMachineType.associate = models => {
		models.SystemRequirementsIncludesMachineType.hasOne(models.SystemRequirements, {foreignKey: 'systemRequirementsID'});
		models.SystemRequirementsIncludesMachineType.hasOne(models.MachineType, {foreignKey: 'machineTypeID'});
	}

	return SystemRequirementsIncludesMachineType;
}
