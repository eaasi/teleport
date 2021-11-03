'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('audio_device', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			id: {
				primaryKey: true,
				type: Sq.INTEGER,
				allowNull: false,
			},
			qid: {
				type: Sq.STRING(64),
				allowNull: true
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		const query = 'DROP TABLE IF EXISTS audio_device CASCADE;';
		return queryInterface.sequelize.query(query);
	}
};
