const Sq = require('sequelize');

'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('softwareLicense', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			softwareLicenseQID: {
				type: Sq.STRING,
				allowNull: false,
				primaryKey: true,
			},
			softwareLicenseName: {
				type: Sq.STRING,
				allowNull: false
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('softwareLicense');
	}
};
