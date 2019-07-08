'use strict';

const Sequelize = require('sequelize');

class TimezoneName extends Sequelize.Model {}
	module.exports = (sequelize) => {
	TimezoneName.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		timezoneNameID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		timeZoneName: {
			type: Sequelize.STRING,
			allowNull: true
		}
	}, { sequelize, tableName: 'timezoneName' });

	return TimezoneName;
};

