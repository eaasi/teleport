'use strict';

const Sequelize = require('sequelize');

class TimezoneLabel extends Sequelize.Model {}
module.exports = (sequelize) => {
	TimezoneLabel.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		timezone_timezoneQID: {
			type: Sequelize.STRING(45),
			allowNull: false,
		},
		timezone_timezoneLabel: {
			type: Sequelize.STRING,
			allowNull: true
		}
	}, { sequelize, tableName: 'timezoneLabel' });

	return TimezoneLabel;
};

