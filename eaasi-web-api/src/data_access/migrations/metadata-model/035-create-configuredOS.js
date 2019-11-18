'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('configured_os', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			id: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			displayResolutionID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'display_resolution',
					key: 'id'
				}
			},
			colorDepthID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'color_depth',
					key: 'id'
				}
			},
			regionQid: {
				type: Sq.STRING(64),
				allowNull: true,
				references: {
					model: 'region',
					key: 'qid'
				}
			},
			timezoneQid: {
				type: Sq.STRING(64),
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
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'software_object',
					key: 'id'
				}
			},
			manifestationOf_osVersionID: {
				type: Sq.INTEGER,
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('configured_os');
	}
};
