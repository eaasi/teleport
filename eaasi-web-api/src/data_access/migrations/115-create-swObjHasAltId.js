'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('software_object_has_alternate_id', {
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
			softwareObject_alternateID: {
				type: Sq.STRING,
				allowNull: true
			},
			softwareObject_alternateIDSource: {
				type: Sq.STRING,
				allowNull: true
			},
			softwareObject_localID: {
				type: Sq.BOOLEAN,
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('software_object_has_alternate_id');
	}
};
