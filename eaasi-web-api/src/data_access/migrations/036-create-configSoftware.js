'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('configured_software', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			configuredSoftwareVersionID: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true,
				references: {
					model: 'software_version',
					key: 'id'
				}
			},
			executableLocation: {
				type: Sq.STRING(256),
				allowNull: true
			},
			executableSyntax: {
				type: Sq.STRING(32),
				allowNull: true
			},
			saveLocation: {
				type: Sq.STRING(256),
				allowNull: true
			},
			languageQid: {
				type: Sq.STRING(64),
				allowNull: true,
				references: {
					model: 'language',
					key: 'qid'
				}
			},
			hasSource_softwareObjectID: {
				type: Sq.INTEGER,
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
