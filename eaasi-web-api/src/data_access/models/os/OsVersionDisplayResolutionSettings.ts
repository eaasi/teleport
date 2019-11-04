'use strict';

const Sequelize = require('sequelize');

class OsVersionDisplayResolutionSettings extends Sequelize.Model {}

module.exports = (sequelize) => {
	OsVersionDisplayResolutionSettings.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		osVersion_osVersionID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'osVersion',
				key: 'osVersionID'
			}
		},
		osVersion_displayResolutionID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'displayResolution',
				key: 'displayResolutionID'
			}
		}
	}, { sequelize, tableName: 'osVersion_displayResolutionSettings' });
	OsVersionDisplayResolutionSettings.associate = models => {
		models.OsVersionDisplayResolutionSettings.hasOne(models.OsVersion, {foreignKey: 'osVersionID'});
		models.OsVersionDisplayResolutionSettings.hasOne(models.DisplayResolution, {foreignKey: 'displayResolutionID'});
	};

	return OsVersionDisplayResolutionSettings;
};
