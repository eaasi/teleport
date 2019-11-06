'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('software_version_has_alternate_id', {
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
			softwareVersion_alternateID: {
				type: Sq.STRING,
				allowNull: false,
				unique: true
			},
			softwareVersion_idSource: {
				type: Sq.STRING,
				allowNull: false
			},
			softwareVersion_localID: {
				type: Sq.BOOLEAN,
				allowNull: false
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('software_version_has_alternate_id');
	}
};
