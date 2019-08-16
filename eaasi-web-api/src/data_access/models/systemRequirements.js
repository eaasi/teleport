'use strict';

const Sequelize = require('sequelize');

class SystemRequirements extends Sequelize.Model {}
module.exports = (sequelize) => {
	SystemRequirements.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		systemRequirementsID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		requirementsSummary: {
			type: Sequelize.TEXT,
			allowNull: true
		},
		minimumRAM: {
			type: Sequelize.INTEGER,
			allowNull: true
		},
		minimumDiskSpace: {
			type: Sequelize.INTEGER,
			allowNull: true
		},
		minimumColorDepth: {
			type: Sequelize.INTEGER,
			allowNull: true,
			references: {
				model: 'colorDepth',
				key: 'colorDepthID'
			}
		},
		minimumDisplayResolution: {
			type: Sequelize.INTEGER,
			allowNull: true,
			references: {
				model: 'displayResolution',
				key: 'displayResolutionID'
			}
		},
		internetAccessRequired: {
			type: Sequelize.BOOLEAN,
			allowNull: true
		},
		minimumMbps: {
			type: Sequelize.INTEGER,
			allowNull: true
		}
	}, { sequelize, tableName: 'systemRequirements' });
	SystemRequirements.associate = models => {
		models.SystemRequirements.hasOne(models.DisplayResolution, {foreignKey: 'displayResolutionID'});
		models.SystemRequirements.hasOne(models.ColorDepth, {foreignKey: 'colorDepthID'});
	};
	return SystemRequirements;
};
