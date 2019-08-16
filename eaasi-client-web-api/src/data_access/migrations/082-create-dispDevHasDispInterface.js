'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('displayDevice_has_displayInterface', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,

		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('displayDevice_has_displayInterface');
	}
};
