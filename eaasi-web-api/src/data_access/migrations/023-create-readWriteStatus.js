'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('read_write_status', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			readWriteStatusID: {
				type: Sq.STRING,
			},
			readWriteStatusName: {
				type: Sq.STRING,
				allowNull: false
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('read_write_status');
	}
};
