'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('osVersion_colorDepthSettings', {
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
			osVersion_colorDepthID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'colorDepth',
					key: 'colorDepthID'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('osVersion_colorDepthSettings');
	}
};
