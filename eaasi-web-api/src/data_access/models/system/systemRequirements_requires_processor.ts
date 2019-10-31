'use strict';

const Sequelize = require('sequelize');

class SystemRequirementsRequiresProcessor extends Sequelize.Model {}
module.exports = (sequelize) => {
	SystemRequirementsRequiresProcessor.init({
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
		systemRequirements_requiresProcessorID: {
			type: Sequelize.STRING,
			allowNull: false,
			references: {
				model: 'processorDevice',
				key: 'processorDeviceID'
			}
		},
		systemRequirements_minimumFrequency: {
			type: Sequelize.INTEGER,
			allowNull: true,
		},
		systemRequirements_minimumFrequencyUnit: {
			type: Sequelize.STRING,
			allowNull: true,
		}
	}, { sequelize, tableName: 'systemRequirements_requires_processor' });
	SystemRequirementsRequiresProcessor.associate = models => {
		models.SystemRequirementsRequiresProcessor.hasOne(models.SystemRequirements, {foreignKey: 'systemRequirementsID'});
		models.SystemRequirementsRequiresProcessor.hasOne(models.ProcessorDevice, {foreignKey: 'processorDeviceID'});
	};
	return SystemRequirementsRequiresProcessor;
};
