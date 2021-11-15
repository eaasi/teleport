'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('machine_interface', {
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
			},
			label: {
				type: Sq.STRING(64),
			},
			bandwidth: {
				type: Sq.INTEGER,
			},
			bandwidthUnit: {
				type: Sq.STRING(12),
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		const query = 'DROP TABLE IF EXISTS machine_interface CASCADE;';
		return queryInterface.sequelize.query(query);
	}
};
