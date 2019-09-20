'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('fileFormat', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			fileFormatID: {
				type: Sq.STRING,
				allowNull: true
			},
			fileFormatQID: {
				type: Sq.STRING,
				allowNull: false,
				primaryKey: true
			},
			fileFormatLabel: {
				type: Sq.STRING,
				allowNull: true
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('fileFormat');
	}
};
