'use strict';

const Sequelize = require('sequelize');

class SystemRequirementsRequiresProcessor extends Sequelize.Model {}
module.exports = (sequelize) => {
	SystemRequirementsRequiresProcessor.init({
		createdAt: Sq.DATE,
		updatedAt: Sq.DATE,
		systemRequirements_systemRequirementsID: {
			type: Sq.INTEGER,
			allowNull: false,
			references: {
				model: 'systemRequirements',
				key: 'systemRequirementsID'
			}
		},
		systemRequirements_requires_processorID: {
			type: Sq.STRING,
			allowNull: false,
			references: {
				model: 'processorDevice',
				key: 'processorDeviceID'
			}
		},
		systemRequirements_minimumFrequency: {
			type: Sq.INTEGER,
			allowNull: false,
		},
		systemRequirements_minimumFrequencyUnit: {
			type: Sq.STRING,
			allowNull: false,
		}
	}, { sequelize, tableName: 'systemRequirements_requires_processor' });
	SystemRequirementsRequiresProcessor.associate = models => {
		models.SystemRequirementsRequiresProcessor.hasOne(models.SystemRequirements, {foreignKey: 'systemRequirementsID'});
		models.SystemRequirementsRequiresProcessor.hasOne(models.ProcessorDevice, {foreignKey: 'processorDeviceID'});
	};
	return SystemRequirementsRequiresProcessor;
};
