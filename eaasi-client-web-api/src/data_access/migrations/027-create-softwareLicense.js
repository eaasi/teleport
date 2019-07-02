const Sq = require('sequelize');

'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('softwareLicense', {
			softwareLicenseQID: {
				type: Sq.STRING,
				allowNull: false
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
