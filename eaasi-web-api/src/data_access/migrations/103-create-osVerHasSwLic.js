'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('os_version_has_software_license', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			osVersion_osVersionID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'os_version',
					key: 'id'
				}
			},
			osVersion_softwareLicenseID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'software_license',
					key: 'id'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('os_version_has_software_license');
	}
};
