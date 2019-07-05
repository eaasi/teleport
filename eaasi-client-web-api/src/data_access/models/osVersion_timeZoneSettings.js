'use strict';

const Sequelize = require('sequelize');

class OsVersionTimezoneSettings extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
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
	};

	static associate(models) {
	}
};

module.exports = {
	OsVersionTimezoneSettings: OsVersionTimezoneSettings
};
