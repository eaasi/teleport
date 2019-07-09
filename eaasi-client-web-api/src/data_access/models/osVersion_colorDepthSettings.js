'use strict';

const Sequelize = require('sequelize');

class OsVersionColorDepthSettings extends Sequelize.Model {}

module.exports = (sequelize) => {

	OsVersionColorDepthSettings.init({
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
		osVersion_colorDepthID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'colorDepth',
				key: 'colorDepthID'
			}
		}
	}, { sequelize, tableName: 'osVersion_colorDepthSettings' });
	OsVersionColorDepthSettings.associate = models => {
		models.OsVersionColorDepthSettings.hasOne(models.ColorDepth, {foreignKey: 'colorDepthID'});
		models.OsVersionColorDepthSettings.hasOne(models.OsVersion, {foreignKey: 'osVersionID'});
	};

	return OsVersionColorDepthSettings;
};
