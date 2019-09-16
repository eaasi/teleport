'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('contentEnvironment_has_contentObject', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			contentEnvironment_contentEnvironmentID: {
				type: Sq.INTEGER,
				allowNull: true,
			},
			contentEnvironment_contentObjectLocalID : {
				type: Sq.STRING,
				allowNull: true
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('contentEnvironment_has_contentObject');
	}
};

