'use strict';

const Sequelize = require('sequelize');

class ReadWriteStatus extends Sequelize.Model {}
module.exports = (sequelize) => {
	ReadWriteStatus.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		readWriteStatusID: {
			type: Sequelize.STRING,
		},
		readWriteStatusName: {
			type: Sequelize.STRING,
			allowNull: false
		}
	}, { sequelize, tableName: 'readWriteStatus' });

	return ReadWriteStatus;
};

