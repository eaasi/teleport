const Sq = require('sequelize');

'use strict';
module.exports = {
	up: (queryInterface, Sequlize) => {
		return queryInterface.createTable('displayDevice', {
			displayResolutionID: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			displayResolutionName: {
				type: Sq.STRING,
				allowNull: false
			}
		});
	},
	down: (queryInterface, Sq) => {
		return queryInterface.dropTable('displayDevice');
	}
};
