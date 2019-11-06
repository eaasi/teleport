'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('software_object_is_manifestation_of_os_version', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			softwareObject_softwareObjectID: {
				type: Sq.STRING,
				allowNull: true,
				references: {
					model: 'software_object',
					key: 'id'
				}
			},
			softwareObject_osVersionID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'os_version',
					key: 'id'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('software_object_is_manifestation_of_os_version');
	}
};
