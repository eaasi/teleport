'use strict';

const Sequelize = require('sequelize');

class ConfiguredOS extends Sequelize.Model {}
module.exports = (sequelize) => {
	ConfiguredOS.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		configuredOperatingSystemID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		configuredDisplayResolution: {
			type: Sequelize.INTEGER,
			allowNull: true,
			references: {
				model: 'displayResolution',
				key: 'displayResolutionID'
			}
		},
		configuredColorDepth: {
			type: Sequelize.INTEGER,
			allowNull: true,
			references: {
				model: 'colorDepth',
				key: 'colorDepthID'
			}
		},
		configuredRegion: {
			type: Sequelize.STRING,
			allowNull: true,
			references: {
				model: 'region',
				key: 'regionQID'
			}
		},
		configuredTimezone: {
			type: Sequelize.STRING,
			allowNull: true,
			references: {
				model: 'timezone',
				key: 'timezoneQID'
			}
		},
		configuredDateTime: {
			type: Sequelize.DATE,
			allowNull: true
		},
		hasSource_softwareObjectID: {
			type: Sequelize.INTEGER,
			allowNull: true,
			references: {
				model: 'softwareObject',
				key: 'softwareObjectID'
			}
		},
		manifestationOf_osVersion: {
			type: Sequelize.INTEGER,
			allowNull: true
		}
	}, { sequelize, tableName: 'configuredOS' });
	ConfiguredOS.associate = models => {
		models.ConfiguredOS.hasOne(models.Timezone, {foreignKey: 'timezoneQID'});
		models.ConfiguredOS.hasOne(models.Region, {foreignKey: 'regionQID'});
		models.ConfiguredOS.hasOne(models.ColorDepth, {foreignKey: 'colorDepthID'});
		models.ConfiguredOS.hasOne(models.SoftwareObject, {foreignKey: 'softwareObjectID'});
	};
	return ConfiguredOS;
};
