'use strict';

const Sequelize = require('sequelize');

class OsVersionTimezoneSettings extends Sequelize.Model {}
module.exports = (sequelize) => {
	OsVersionTimezoneSettings.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		osVersion_softwareVersionID: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		osVersion_has_timeZoneSetting: {
			type: Sequelize.STRING,
			allowNull: true
		}
	}, { sequelize, tableName: 'osVersion_has_timeZoneSettings' });
	return OsVersionTimezoneSettings;
};
