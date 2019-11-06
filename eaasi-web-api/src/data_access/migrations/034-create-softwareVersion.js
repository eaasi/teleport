'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('software_version', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			softwareVersionID: {
				type: Sq.STRING,
				allowNull: false,
				primaryKey: true,
			},
			softwareVersionQID: {
				type: Sq.STRING,
				allowNull: true
			},
			softwareVersionName: {
				type: Sq.STRING,
				allowNull: false
			},
			softwareVersionHelpText: {
				type: Sq.STRING,
				allowNull: false
			},
			softwareVersionNumber: {
				type: Sq.STRING,
				allowNull: true
			},
			softwareVersionPublicationDate: {
				type: Sq.STRING,
				allowNull: true
			},
			isVersionOf_softwareProduct: {
				type: Sq.STRING,
				allowNull: true,
				references: {
					model: 'softwareProduct',
					key: 'id'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('software_version');
	}
};
