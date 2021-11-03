'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('software_version', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			id: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			qid: {
				type: Sq.STRING(64),
				allowNull: true
			},
			name: {
				type: Sq.STRING(128),
				allowNull: false
			},
			helpText: {
				type: Sq.TEXT,
				allowNull: false
			},
			versionNumber: {
				type: Sq.STRING(64),
				allowNull: true
			},
			publicationDate: {
				type: Sq.DATE,
				allowNull: true
			},
			isVersionOf_softwareProduct: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'software_product',
					key: 'id'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		const query = 'DROP TABLE IF EXISTS software_version CASCADE;';
		return queryInterface.sequelize.query(query);
	}
};
