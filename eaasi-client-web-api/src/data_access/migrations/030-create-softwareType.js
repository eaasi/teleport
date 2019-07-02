const Sq = require('sequelize');

'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('softwareType', {
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
		return queryInterface.dropTable('softwareType');
	}
};
