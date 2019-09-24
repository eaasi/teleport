'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('mediaType', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			mediaTypeLabel: {
				type: Sq.STRING,
				allowNull: false,
			},
			mediaTypeQID: {
				type: Sq.STRING,
				allowNull: false
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('mediaType');
	}
};
