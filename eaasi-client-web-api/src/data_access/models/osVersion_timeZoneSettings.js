'use strict';

const Sequelize = require('sequelize');

class OsVersionTimezoneSettings extends Sequelize.Model {}
	module.exports = (sequelize) => {
	OsVersionTimezoneSettings.init({
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
		osVersion_timezoneQID: {
			type: Sequelize.STRING,
			allowNull: true,
			references: {
				model: 'timezone',
				key: 'timezoneQID'
			}
		},
		osVersion_timezoneName: {
			type: Sequelize.STRING,
			allowNull: true
		}
	}, { sequelize, tableName: 'osVersion_timezoneSettings' });
	OsVersionTimezoneSettings.associate = models => {
		models.OsVersionTimezoneSettings.hasOne(models.OsVersion, {foreignKey: 'osVersionID'})
		models.OsVersionTimezoneSettings.hasOne(models.Timezone, {foreignKey: 'timezoneQID'})
	}
	return OsVersionTimezoneSettings;
};
