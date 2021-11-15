'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('processor_device', {
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
			frequency: {
				type: Sq.INTEGER,
				allowNull: true
			},
			frequencyUnit: {
				type: Sq.STRING(16),
				allowNull: true
			},
			cpuArchitecture: {
				type: Sq.STRING(64),
				allowNull: true,
				references: {
					model: 'cpu_architecture',
					key: 'qid'
				}
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		const query = 'DROP TABLE IF EXISTS processor_device CASCADE;';
		return queryInterface.sequelize.query(query);
	}
};
