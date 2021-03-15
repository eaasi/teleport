'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('bookmark', {
			id: {
				type: Sq.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			userId: {
				type: Sq.STRING(50),
				allowNull: false,
				references: {
					model: 'eaasi_user',
					key: 'id'
				}
			},
			resourceId: {
				type: Sq.STRING(128),
				allowNull: false
			},
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE
		})
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('bookmark');
	}
};
