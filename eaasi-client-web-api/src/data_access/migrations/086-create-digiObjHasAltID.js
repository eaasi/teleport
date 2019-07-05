'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('digitalObject_has_alternativeID', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			digitalObject_digitalObjectID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'digitalObject',
					key: 'digitalObjectID'
				}
			},
			alternativeID_alternativeID: {
				type: Sq.STRING,
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('digitalObject_has_alternativeID');
	}
};
