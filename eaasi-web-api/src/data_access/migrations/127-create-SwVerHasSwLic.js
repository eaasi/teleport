'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('software_version_has_software_license', {
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
			softwareLicenseID: {
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
		return queryInterface.dropTable('software_version_has_software_license');
	}
};
