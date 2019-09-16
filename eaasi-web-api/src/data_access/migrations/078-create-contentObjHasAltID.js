'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('contentObject_has_alternateID', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			contentObject_contentObjectLocalID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'contentObject',
					key: 'contentObjectLocalID'
				}
			},
			alternativeID_alternativeID: {
				type: Sq.STRING,
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('contentObject_has_alternateID');
	}
};
