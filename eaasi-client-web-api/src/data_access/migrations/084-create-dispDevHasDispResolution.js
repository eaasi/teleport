'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('displayDevice_has_displayResolution', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			displayDevice_displayDeviceID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'displayDevice',
					key: 'displayDeviceID'
				}
			},
			availableDisplayResolution: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'displayResolution',
					key: 'displayResolutionName'
				}
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('displayDevice_has_displayResolution');
	}
};
