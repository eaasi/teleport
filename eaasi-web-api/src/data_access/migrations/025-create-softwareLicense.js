'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('softwareLicense', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			softwareLicenseID: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			softwareLicenseQID: {
				type: Sq.STRING,
				allowNull: true,
			},
			softwareLicenseLabel: {
				type: Sq.STRING,
				allowNull: false
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('softwareLicense');
	}
};
