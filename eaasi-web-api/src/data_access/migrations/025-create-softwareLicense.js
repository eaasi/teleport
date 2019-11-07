'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('software_license', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			softwareLicenseID: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			qid: {
				type: Sq.STRING,
				allowNull: true,
			},
			label: {
				type: Sq.STRING,
				allowNull: false
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('software_license');
	}
};
