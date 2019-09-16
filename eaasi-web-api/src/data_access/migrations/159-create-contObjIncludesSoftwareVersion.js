'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('contentObject_includes_softwareVersion', {
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
			contentObjectFile_includes_softwareVersion: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'softwareVersion',
					key: 'softwareVersionID'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('contentObject_includes_softwareVersion');
	}
};

