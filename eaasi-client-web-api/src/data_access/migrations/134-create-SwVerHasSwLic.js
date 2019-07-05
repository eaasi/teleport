const Sq = require('sequelize');

'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('softwareVersion_has_softwareLicense', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			softwareVersion_softwareVersionID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'softwareVersion',
					key: 'softwareVersionID'
				}
			},
			softwareVersion_softwareLicenseQID: {
				type: Sq.STRING,
				allowNull: true,
				references: {
					model: 'softwareLicense',
					key: 'softwareLicenseQID'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('softwareVersion_has_softwareLicense');
	}
};
