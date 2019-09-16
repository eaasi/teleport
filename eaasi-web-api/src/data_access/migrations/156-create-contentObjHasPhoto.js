'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('contentObject_has_photograph', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			contentObject_contentObjectLocalID: {
				type: Sq.STRING,
				allowNull: false,
				references: {
					model: 'contentObject',
					key: 'contentObjectLocalID'
				}
			},
			contentObject_photographFileID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'file',
					key: 'fileID'
				}
			},
			contentObject_photographLabel: {
				type: Sq.STRING,
				allowNull: true
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('contentObject_has_photograph');
	}
};

