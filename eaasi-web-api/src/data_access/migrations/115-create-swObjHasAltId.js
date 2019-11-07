'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('software_object_has_alternate_id', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			softwareObjectID: {
				type: Sq.STRING,
				allowNull: true,
				references: {
					model: 'software_object',
					key: 'id'
				}
			},
			softwareObjectAlternateID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'software_object',
					key: 'id'
				}
			},
			alternateIdSource: {
				type: Sq.STRING(128),
				allowNull: true
			},
			isLocalID: {
				type: Sq.BOOLEAN,
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('software_object_has_alternate_id');
	}
};
