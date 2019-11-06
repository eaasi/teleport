'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('configured_software', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			configuredSoftwareVersionID: {
				type: Sq.STRING,
				allowNull: false,
				primaryKey: true,
				references: {
					model: 'software_version',
					key: 'id'
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
					model: 'software_object',
					key: 'id'
				}
			},
			hasSource_contentObjectLocalID: {
				type: Sq.STRING,
				allowNull: true,
				references: {
					model: 'content_object',
					key: 'id'
				}
			},
			manifestationOf_softwareVersion: {
				type: Sq.INTEGER,
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('configured_software');
	}
};
