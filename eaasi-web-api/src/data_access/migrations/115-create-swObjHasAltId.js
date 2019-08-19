'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('softwareObject_has_alternateID', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			softwareObject_softwareObjectID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'softwareObject',
					key: 'softwareObjectID'
				}
			},
			softwareObject_alternateID: {
				type: Sq.STRING,
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('softwareObject_has_alternateID');
	}
};
