const Sq = require('sequelize');

'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('softwareProduct_has_softwareType', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			softwareProduct_softwareProductID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'softwareProduct',
					key: 'softwareProductID'
				}
			},
			softwareProduct_softwareTypeQID: {
				type: Sq.STRING,
				allowNull: false,
				references: {
					model: 'softwareType',
					key: 'softwareTypeQID'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('softwareProduct_has_softwareType');
	}
};
