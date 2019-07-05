'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('alternateName', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			alternateNameID: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sq.INTEGER
			},
			alternateName: {
				allowNull: false,
				type: Sq.STRING
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('aaaTests');
	}
};
