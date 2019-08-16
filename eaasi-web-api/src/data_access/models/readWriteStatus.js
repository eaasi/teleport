'use strict';

const Sequelize = require('sequelize');

class ReadWriteStatus extends Sequelize.Model {}
module.exports = (sequelize) => {
	ReadWriteStatus.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		readWriteStatusID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		readWriteStatusName: {
			type: Sequelize.STRING,
			allowNull: false
		}
	}, { sequelize, tableName: 'readWriteStatus' });

	return ReadWriteStatus;
};

