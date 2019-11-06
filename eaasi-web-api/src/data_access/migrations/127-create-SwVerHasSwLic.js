'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('software_version_has_software_license', {
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
			softwareVersion_softwareLicenseID: {
				type: Sq.INTEGER,
				allowNull: true,
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
