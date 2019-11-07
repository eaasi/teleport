'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('software_family_version_has_software_version', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			softwareFamilyVersionID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'software_version',
					key: 'id'
				}
			},
			hasPart_softwareVersionID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'software_version',
					key: 'id'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('software_family_version_has_software_version');
	}
};
