'use strict';

const Sequelize = require('sequelize');

class TimezoneName extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
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
	};

	static associate(models) {
	}
};

module.exports = {
	TimezoneName: TimezoneName
};
