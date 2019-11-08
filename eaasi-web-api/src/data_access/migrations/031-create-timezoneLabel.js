'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('timezone_label', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			timezoneQid: {
				type: Sq.STRING(64),
				allowNull: false,
				references: {
					model: 'timezone',
					key: 'qid'
				}
			},
			label: {
				type: Sq.STRING(128),
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('timezone_label');
	}
};
