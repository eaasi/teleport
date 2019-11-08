'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('content_object_has_object_file', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			contentObjectLocalID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'content_object',
					key: 'localID'
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
				type: Sq.STRING(64),
				allowNull: true
			},
			productKey: {
				type: Sq.STRING(1028),
				allowNull: true
			},
			fileOrder: {
				type: Sq.INTEGER,
				allowNull: true
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('content_object_has_object_file');
	}
};
