const Sq = require('sequelize');

'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('readWriteStatus', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			readWriteStatusID: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			readWriteStatusName: {
				type: Sq.STRING,
				allowNull: false
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('readWriteStatus');
	}
};
