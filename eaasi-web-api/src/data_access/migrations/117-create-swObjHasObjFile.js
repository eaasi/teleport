'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('software_object_has_object_file', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			softwareObjectID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'software_object',
					key: 'id'
				}
			},
			fileID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'file',
					key: 'id'
				}
			},
			label: {
				type: Sq.STRING(128),
				allowNull: true
			},
			mediaTypeName: {
				type: Sq.STRING(128),
				allowNull: true
			},
			fileOrder: {
				type: Sq.INTEGER,
				allowNull: true
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('software_object_has_object_file');
	}
};
