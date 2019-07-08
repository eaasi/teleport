'use strict';

const Sequelize = require('sequelize');

class Timezone extends Sequelize.Model {}
module.exports = (sequelize) => {
	Timezone.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		timezoneQID: {
			type: Sequelize.STRING,
			allowNull: false,
			primaryKey: true
		},
		utcOffset: {
			type: Sequelize.STRING,
			allowNull: true
		}
	}, { sequelize, tableName: 'timezone' });

	return Timezone;
};
