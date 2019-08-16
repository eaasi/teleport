'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('softwareProduct_has_alternateName', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			softwareProduct_softwareProductID: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true,
				references: {
					model: 'softwareProduct',
					key: 'softwareProductID'
				}
			},
			softwareProduct_alternateNameID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'alternateName',
					key: 'alternateNameID'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('softwareProduct_has_alternateName');
	}
};
