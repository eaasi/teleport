'use strict';

const Sequelize = require('sequelize');

class OsVersionRegionSettings extends Sequelize.Model {}
module.exports = (sequelize) => {
	OsVersionRegionSettings.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		osVersion_osVersionID: {
			type: Sequelize.INTEGER,
			allowNull: true,
			references: {
				model: 'osVersion',
				key: 'osVersionID'
			}
		},
		osVersion_regionQID: {
			type: Sequelize.STRING,
			allowNull: true,
			references: {
				model: 'region',
				key: 'regionQID'
			}
		},
		osVersion_defaultRegion: {
			type: Sequelize.BOOLEAN,
			allowNull: true
		}
	}, { sequelize, tableName: 'osVersion_regionSettings' });
	OsVersionRegionSettings.associate = models => {
		models.OsVersionRegionSettings.hasOne(models.OsVersion, {foreignKey: 'osVersionID'});
	};
	return OsVersionRegionSettings;
};

