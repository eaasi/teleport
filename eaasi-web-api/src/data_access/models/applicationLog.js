'use strict';

const Sequelize = require('sequelize');

class ApplicationLog extends Sequelize.Model {}

module.exports = (sequelize) => {
	ApplicationLog.init({
		createdAt: Sequelize.DATE,
		/**
		 * Log Level (DEBUG, INFO, WARN, ERROR, FATAL)
		 */
		level: {
			type: Sequelize.STRING,
			allowNull: false
		},
		/**
		 * Source of the log in the application
		 */
		source: {
			type: Sequelize.STRING,
			allowNull: false
		},
		/**
		 * Log message
		 */
		message: {
			type: Sequelize.STRING,
			allowNull: false
		},
	}, { sequelize, tableName: 'userInformation' });

	return ApplicationLog;
};
