'use strict';

const Sequelize = require('sequelize');

class TimezoneHasTimezoneName extends Sequelize.Model {}
module.exports = (sequelize) => {
	TimezoneHasTimezoneName.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		timezone_timezoneQID: {
			type: Sequelize.STRING,
			allowNull: false,
			references: {
				model: 'timezone',
				key: 'timezoneQID'
			}
		},
		timezoneName_timezoneNameID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'timezoneName',
				key: 'timezoneNameID'
			}
		}
	}, { sequelize, tableName: 'timezone_has_timezoneName' });
	TimezoneHasTimezoneName.associate = models => {
		models.TimezoneHasTimezoneName.hasOne(
			models.Timezone, {foreignKey: 'timezoneQID'});
		models.TimezoneHasTimezoneName.hasOne(
			models.TimezoneName, {foreignKey: 'timezoneNameID'});
	};

	return TimezoneHasTimezoneName;
};
