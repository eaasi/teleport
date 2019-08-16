'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('configuredOS', {
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
					model: 'displayResolution',
					key: 'displayResolutionID'
				}
			},
			configuredColorDepth: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'colorDepth',
					key: 'colorDepthID'
				}
			},
			configuredRegion: {
				type: Sq.STRING,
				allowNull: true,
				references: {
					model: 'region',
					key: 'regionQID'
				}
			},
			configuredTimezone: {
				type: Sq.STRING,
				allowNull: true,
				references: {
					model: 'timezone',
					key: 'timezoneQID'
				}
			},
			configuredDateTime: {
				type: Sq.DATE,
				allowNull: true
			},
			hasSource_softwareObjectID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'softwareObject',
					key: 'softwareObjectID'
				}
			},
			manifestationOf_osVersion: {
				type: Sq.INTEGER,
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('configuredOS');
	}
};
