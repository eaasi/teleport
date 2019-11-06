'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('software_environment_has_disk_image', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			softwareEnvironment_softwareEnvironmentID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'software_environment',
					key: 'id'
				}
			},
			diskImageID: {
				type: Sq.STRING,
				allowNull: true
			},
			mountPoint: {
				type: Sq.STRING,
				allowNull: true
			},
			fileSystem: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'file_system',
					key: 'id'
				}
			},
			storageCapacityBytes: {
				type: Sq.INTEGER,
				allowNull: true
			},
			storageUsedBytes: {
				type: Sq.INTEGER,
				allowNull: true
			},
			storageRemainingBytes: {
				type: Sq.INTEGER,
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('software_environment_has_disk_image');
	}
};
