'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('mimeType', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			mimeTypeLabel_pk: {
				type: Sq.INTEGER,
				primaryKey: true
			},
			mimeTypeLabel: {
				type: Sq.STRING,
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('mimeType');
	}
};
