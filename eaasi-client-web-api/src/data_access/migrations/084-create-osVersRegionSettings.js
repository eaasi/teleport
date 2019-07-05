const Sq = require('sequelize');

'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('osVersionRegionSettings', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			osVersion_osVersionID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'osVersion',
					key: 'osVersionID'
				}
			},
			osVersion_regionQID: {
				type: Sq.STRING,
				allowNull: true,
				references: {
					model: 'region',
					key: 'regionQID'
				}
			},
			osVersion_defaultRegion: {
				type: Sq.BOOLEAN,
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('osVersionRegionSettings');
	}
};
