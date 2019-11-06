'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('file_format', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			fileFormatID: {
				type: Sq.STRING,
				allowNull: true,
				primaryKey: true

			},
			fileFormatQID: {
				type: Sq.STRING,
				allowNull: false
			},
			fileFormatLabel: {
				type: Sq.STRING,
				allowNull: true
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('file_format');
	}
};
