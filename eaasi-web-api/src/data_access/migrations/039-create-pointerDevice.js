'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('pointer_device', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			id: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			qid: {
				type: Sq.STRING(64),
				allowNull: true
			},
			name: {
				type: Sq.STRING(64),
				allowNull: false
			},
			label: {
				type: Sq.STRING(64),
				allowNull: false
			},
			pointerDeviceTypeID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'pointer_device_type',
					key: 'id'
				}
			}
		});
	},
	down: (queryInterface, Sq) => {
		return queryInterface.dropTable('pointer_device');
	}
};
