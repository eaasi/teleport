'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('softwareVersion_has_format_implementation', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			softwareVersion_softwareVersionID: {
				type: Sq.STRING,
				allowNull: false,
				references: {
					model: 'software_version',
					key: 'id'
				}
			},
			softwareVersion_formatImplementationID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'format_implementation',
					key: 'id'
				}
			},
			softwareVersion_implementationOperation: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'format_operation',
					key: 'id'
				}
			},
			defaultImplementation: {
				type: Sq.BOOLEAN,
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('software_version_has_format_implementation');
	}
};
