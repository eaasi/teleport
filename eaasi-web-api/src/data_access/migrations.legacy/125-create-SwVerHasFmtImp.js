'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('software_version_has_format_implementation', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			softwareVersionID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'software_version',
					key: 'id'
				}
			},
			formatImplementationID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'format_implementation',
					key: 'id'
				}
			},
			formatOperationID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'format_operation',
					key: 'id'
				}
			},
			isDefaultImplementation: {
				type: Sq.BOOLEAN,
				allowNull: false,
				defaultValue: false
			}
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('softwareVersion_has_format_implementation');
		return queryInterface.dropTable('software_version_has_format_implementation');
	}
};
