'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('os_version_region_settings', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			osVersion_osVersionID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'os_version',
					key: 'id'
				}
			},
			osVersion_regionQID: {
				type: Sq.STRING,
				allowNull: true,
				references: {
					model: 'region',
					key: 'qid'
				}
			},
			osVersion_defaultRegion: {
				type: Sq.BOOLEAN,
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('os_version_region_settings');
	}
};
