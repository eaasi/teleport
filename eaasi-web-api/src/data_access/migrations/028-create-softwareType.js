'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('software_type', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			softwareTypeQID: {
				type: Sq.STRING,
				allowNull: false,
				primaryKey: true
			},
			softwareTypeName: {
				type: Sq.STRING,
				allowNull: false
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('software_type');
	}
};
