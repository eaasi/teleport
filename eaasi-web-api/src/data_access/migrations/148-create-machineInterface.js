'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('machineInterface', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			machineInterfaceID: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			machineInterfaceQID: {
				type: Sq.STRING(45),
			},
			machineInterfaceLabel: {
				type: Sq.STRING,
			},
			machineInterfaceBandwidth: {
				type: Sq.INTEGER,
			},
			machineInterfaceBandwidthUnit: {
				type: Sq.STRING,
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('machineInterface');
	}
};
