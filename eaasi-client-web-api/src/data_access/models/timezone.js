'use strict';

const Sequelize = require('sequelize');

class Timezone extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
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
	};

	static associate(models) {
	}
};

module.exports = {
	Timezone: Timezone
};
