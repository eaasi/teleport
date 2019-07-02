const Sq = require('sequelize');

'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('softwareVersion', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			softwareVersionID: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			softwareVersionQID: {
				type: Sq.STRING,
				allowNull: true
			},
			softwareVersionName: {
				type: Sq.STRING,
				allowNull: false
			},
			softwareVersionDescription: {
				type: Sq.STRING,
				allowNull: false
			},
			softwareVersionNumber: {
				type: Sq.STRING,
				allowNull: true
			},
			softwareVersionPublicationDate: {
				type: Sq.DATE,
				allowNull: true
			},
			softwareVersionSystemRequirements: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'systemRequirements',
					key: 'systemRequirementsID'
				}
			},
			isVersionOf_softwareProduct: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'softwareProduct',
					key: 'softwareProductID'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('softwareVersion');
	}
};
