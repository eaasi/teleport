'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('software_product_has_software_type', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			softwareProductID: {
				type: Sq.STRING,
				allowNull: false,
				references: {
					model: 'software_product',
					key: 'id'
				}
			},
			softwareTypeQid: {
				type: Sq.STRING,
				allowNull: false,
				references: {
					model: 'software_type',
					key: 'qid'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('softwareProduct_has_softwareType');
	}
};
