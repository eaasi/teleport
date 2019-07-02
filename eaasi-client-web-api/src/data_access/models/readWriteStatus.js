'use strict';

const Sequelize = require('sequelize');

class ReadWriteStatus extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
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
	};

	static associate(models) {
	}
};

module.exports = {
	ReadWriteStatus: ReadWriteStatus
};
