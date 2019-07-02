const Sq = require('sequelize');

'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('region', {
			regionQID: {
				type: Sq.STRING,
				allowNull: false,
				primaryKey: true
			},
			regionName: {
				type: Sq.STRING,
				allowNull: false
			},
			iso31661_numericCode: {
				type: Sq.INTEGER,
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('region');
	}
};
