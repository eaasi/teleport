'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('configuredSoftware', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			configuredSoftwareVersionID: {
				type: Sq.STRING,
				allowNull: false,
				primaryKey: true,
				references: {
					model: 'softwareVersion',
					key: 'softwareVersionID'
				}
			},
			executableLocation: {
				type: Sq.STRING,
				allowNull: true
			},
			executableSyntax: {
				type: Sq.STRING,
				allowNull: true
			},
			saveLocation: {
				type: Sq.STRING,
				allowNull: true
			},
			configuredLanguage: {
				type: Sq.INTEGER,
				allowNull: true
			},
			hasSource_softwareObjectID: {
				type: Sq.STRING,
				allowNull: true,
				references: {
					model: 'softwareObject',
					key: 'softwareObjectID'
				}
			},
			hasSource_contentObjectLocalID: {
				type: Sq.STRING,
				allowNull: true,
				references: {
					model: 'contentObject',
					key: 'contentObjectLocalID'
				}
			},
			manifestationOf_softwareVersion: {
				type: Sq.INTEGER,
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('configuredSoftware');
	}
};
