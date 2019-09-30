'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('osVersion_has_timeZoneSettings', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			osVersion_softwareVersionID: {
				type: Sq.STRING,
				allowNull: true,
			},
			osVersion_has_timezoneSetting: {
				type: Sq.STRING,
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('osVersion_has_timeZoneSettings');
	}
};
