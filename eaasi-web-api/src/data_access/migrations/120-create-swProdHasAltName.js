'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('software_product_has_alternate_name', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			softwareProductID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'software_product',
					key: 'id'
				}
			},
			alternateName: {
				type: Sq.STRING,
				allowNull: false,
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('software_product_has_alternate_name');
	}
};
