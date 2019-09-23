'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('displayDevice_has_driverSoftware', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			displayDevice_displayDeviceID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'displayDevice',
					key: 'displayDeviceID'
				}
			},
			displayDevice_driverSoftwareID: {
				type: Sequelize.STRING,
				allowNull: false,
				references: {
					model: 'softwareVersion',
					key: 'softwareVersionID'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('displayDevice_has_driverSoftware');
	}
};
