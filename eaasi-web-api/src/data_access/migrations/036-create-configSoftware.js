'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('configured_software', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			id: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			softwareVersionID: {
				type: Sq.INTEGER,
				allowNull: false,
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
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'content_object',
					key: 'localID'
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
