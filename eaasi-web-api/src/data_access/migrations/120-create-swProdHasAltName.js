'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('softwareProduct_has_alternateName', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			softwareProduct_softwareProductID: {
				type: Sq.STRING,
				allowNull: false,
				references: {
					model: 'softwareProduct',
					key: 'softwareProductID'
				}
			},
			softwareProduct_alternateName: {
				type: Sq.STRING,
				allowNull: false,
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('softwareProduct_has_alternateName');
	}
};
