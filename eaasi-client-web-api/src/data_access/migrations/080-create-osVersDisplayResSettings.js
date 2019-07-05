const Sq = require('sequelize');

'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('osVersionDisplayResolutionSettings', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			osVersion_osVersionID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'osVersion',
					key: 'osVersionID'
				}
			},
			osVersion_displayResolutionID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'displayResolution',
					key: 'displayResolutionID'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('osVersionDisplayResolutionSettings');
	}
};
