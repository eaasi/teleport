'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('keyboard_device', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			id: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			qid: {
				type: Sq.STRING,
				allowNull: true
			},
			name: {
				type: Sq.STRING,
				allowNull: false
			},
			keyboardLayoutID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'keyboard_layout',
					key: 'id'
				}
			},
			languageQid: {
				type: Sq.STRING,
				allowNull: true,
				references: {
					model: 'language',
					key: 'qid'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('keyboard_device');
	}
};
