'use strict';

const Sequelize = require('sequelize');

class ConfiguredSoftware extends Sequelize.Model {}
	module.exports = (sequelize) => {
	ConfiguredSoftware.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		configuredSoftwareVersionID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'softwareVersion',
				key: 'softwareVersionID'
			}
		},
		executableLocation: {
			type: Sequelize.STRING,
			allowNull: true
		},
		executableSyntax: {
			type: Sequelize.STRING,
			allowNull: true
		},
		saveLocation: {
			type: Sequelize.STRING,
			allowNull: true
		},
		configuredLanguage: {
			type: Sequelize.INTEGER,
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
		hasSource_digitalObjectID: {
			type: Sequelize.INTEGER,
			allowNull: true,
			references: {
				model: 'digitalObject',
				key: 'digitalObjectID'
			}
		},
		manifestationOf_softwareVersion: {
			type: Sequelize.INTEGER,
			allowNull: true
		}
	}, { sequelize, tableName: 'configuredSoftware' });
	ConfiguredSoftware.associate = models => {
		models.ConfiguredSoftware.hasOne(models.DigitalObject, {foreignKey: 'digitalObjectID'});
		models.ConfiguredSoftware.hasOne(models.SoftwareObject, {foreignKey: 'softwareObjectID'});
		models.ConfiguredSoftware.hasOne(models.SoftwareVersion, {foreignKey: 'softwareVersionID'});
	};

	return ConfiguredSoftware;
}
