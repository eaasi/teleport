const Sq = require('sequelize');

'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('mountFormat', {
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
