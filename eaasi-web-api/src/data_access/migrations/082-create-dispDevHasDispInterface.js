'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('display_device_has_display_interface', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('display_device_has_display_interface');
	}
};
