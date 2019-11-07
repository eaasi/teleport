'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('software_object_is_manifestation_of_software_version', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			softwareObjectID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'software_object',
					key: 'id'
				}
			},
			softwareVersionID: {
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
		return queryInterface.dropTable('software_object_is_manifestation_of_software_version');
	}
};
