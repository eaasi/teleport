'use strict';

const Sequelize = require('sequelize');

class SystemRequirementsRequiresProcessor extends Sequelize.Model {}
module.exports = (sequelize) => {
	SystemRequirementsRequiresProcessor.init({
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
		systemRequirements_processorID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'processor',
				key: 'processorID'
			}
		},
		systemRequirements_minimumFrequency: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		systemRequirements_minimumFrequencyUnit: {
			type: Sequelize.STRING,
			allowNull: false,
		}
	}, { sequelize, tableName: 'systemRequirements_requires_processor' });
	SystemRequirementsRequiresProcessor.associate = models => {
		models.SystemRequirementsRequiresProcessor.hasOne(models.SystemRequirements, {foreignKey: 'systemRequirementsID'});
		models.SystemRequirementsRequiresProcessor.hasOne(models.Processor, {foreignKey: 'processorID'});
	};
	return SystemRequirementsRequiresProcessor;
};
