'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('configured_disk_has_partition', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			softwareEnvironmentID: {
				type: Sq.STRING,
				allowNull: true,
				references: {
					model: 'software_environment',
					key: 'id'
				}
			},
			fileSystemID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'file_system',
					key: 'id'
				}
			},
			isStartupDisk: {
				type: Sq.BOOLEAN,
				allowNull: false,
				defaultValue: false
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('configured_disk_has_partition');
	}
};
