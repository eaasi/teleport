'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('softwareFamilyVersion_hasPart_softwareProduct', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			softwareFamilyID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'softwareProduct',
					key: 'softwareProductID'
				}
			},
			hasPart_softwareProduct: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'softwareProduct',
					key: 'softwareProductID'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('softwareFamilyVersion_hasPart_softwareProduct');
	}
};
