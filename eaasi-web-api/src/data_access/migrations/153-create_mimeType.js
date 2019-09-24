'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('mimeType', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			mimeTypeLabel: {
				type: Sq.STRING,
				primaryKey: true
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('mimeType');
	}
};
