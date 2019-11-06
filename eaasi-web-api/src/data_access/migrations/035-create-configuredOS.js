'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('configured_os', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			configuredOperatingSystemID: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			configuredDisplayResolution: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'display_resolution',
					key: 'id'
				}
			},
			configuredColorDepth: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'color_depth',
					key: 'id'
				}
			},
			configuredRegion: {
				type: Sq.STRING,
				allowNull: true,
				references: {
					model: 'region',
					key: 'qid'
				}
			},
			configuredTimezone: {
				type: Sq.STRING,
				allowNull: true,
				references: {
					model: 'timezone',
					key: 'qid'
				}
			},
			configuredDateTime: {
				type: Sq.DATE,
				allowNull: true
			},
			hasSource_softwareObjectID: {
				type: Sq.STRING,
				allowNull: true,
				references: {
					model: 'software_object',
					key: 'id'
				}
			},
			manifestationOf_osVersion: {
				type: Sq.INTEGER,
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('configured_os');
	}
};
