'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('mountFormat', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			mountFormatQID: {
				type: Sq.STRING,
				allowNull: false,
				primaryKey: true
			},
			mountFormatName: {
				type: Sq.STRING,
				allowNull: false
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('mountFormat');
	}
};
