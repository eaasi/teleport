'use strict';

const Sequelize = require('sequelize');

class SystemRequirements extends Sequelize.Model {}
module.exports = (sequelize) => {
	SystemRequirements.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		systemRequirementsID: {
			type: Sequelize.STRING,
			allowNull: false,
			primaryKey: true,
		},
		requirementsSummary: {
			type: Sequelize.TEXT,
			allowNull: true
		},
		minimumRAM: {
			type: Sequelize.INTEGER,
			allowNull: true
		},
		minimumRAM_unitName: {
			type: Sequelize.STRING,
			allowNull: true
		},
		minimumDiskVolume: {
			type: Sequelize.INTEGER,
			allowNull: true
		},
		minimumDiskVolume_unitName: {
			type: Sequelize.STRING,
			allowNull: true
		},
		minimumColorDepth: {
			type: Sequelize.STRING,
			allowNull: true,
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
		minimumNetworkBitRate: {
			type: Sequelize.INTEGER,
			allowNull: true
		},
		minimumNetworkBitRate_unitName: {
			type: Sequelize.STRING,
			allowNull: true
		}
	}, { sequelize, tableName: 'systemRequirements' });
	SystemRequirements.associate = models => {
		models.SystemRequirements.hasOne(models.DisplayResolution, {foreignKey: 'displayResolutionID'});
		models.SystemRequirements.hasOne(models.ColorDepth, {foreignKey: 'colorDepthID'});
	};
	return SystemRequirements;
};
