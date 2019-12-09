'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('software_version_includes_software_version', {
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
			includesSoftwareVersionID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'software_version',
					key: 'id'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('software_version_includes_software_version');
	}
};
