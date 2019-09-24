'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('readWriteStatus', {
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
		return queryInterface.dropTable('readWriteStatus');
	}
};
