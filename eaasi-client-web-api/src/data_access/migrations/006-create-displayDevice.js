const Sq = require('sequelize');

'use strict';
module.exports = {
	up: (queryInterface, Sequlize) => {
		return queryInterface.createTable('displayDevice', {
			displayDeviceID: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			displayDeviceQID: {
				type: Sq.STRING,
				allowNull: true
			},
			displayDeviceName: {
				type: Sq.STRING,
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sq) => {
		return queryInterface.dropTable('displayDevice');
	}
};
