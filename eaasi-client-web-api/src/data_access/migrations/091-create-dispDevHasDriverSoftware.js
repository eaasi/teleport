const Sq = require('sequelize');

'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('displayDevice_has_driverSoftware', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('displayDevice_has_driverSoftware');
	}
};
