const Sq = require('sequelize');

'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('softwareVersion_has_formatImplementation', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			softwareVersion_softwareVersionID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'softwareVersion',
					key: 'softwareVersionID'
				}
			},
			softwareVersion_formatImplementationID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'formatImplementation',
					key: 'formatImplementationID'
				}
			},
			softwareVersion_implementationOperation: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'formatOperation',
					key: 'operationID'
				}
			},
			defaultImplementation: {
				type: Sq.BOOLEAN,
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('softwareVersion_has_formatImplementation');
	}
};
