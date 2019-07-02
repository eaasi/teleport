const Sq = require('sequelize');

'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('pointerDevice', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			pointerDeviceID: {
				type: Sq.INTEGER,
				allowNull: false
			},
			pointerDeviceQID: {
				type: Sq.STRING,
				allowNull: true
			},
			pointerDeviceName: {
				type: Sq.STRING,
				allowNull: false
			},
			pointerDeviceType: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'pointerDeviceType',
					key: 'pointerDeviceTypeID'
				}
			}
		});
	},
	down: (queryInterface, Sq) => {
		return queryInterface.dropTable('pointerDevice');
	}
};
