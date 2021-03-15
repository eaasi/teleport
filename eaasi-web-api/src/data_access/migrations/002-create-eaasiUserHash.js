'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('eaasi_user_hash', {
			userId: {
				type: Sq.STRING(50),
				allowNull: false,
				primaryKey: true,
				columnName: 'user_id',
				references: {
					model: 'eaasi_user',
					key: 'id'
				}
			},
			hash: {
				type: Sq.STRING,
				allowNull: false
			},
			createdAt: {
				type: Sq.DATE,
				defaultValue: new Date()
			},
			updatedAt: {
				type: Sq.DATE,
				defaultValue: new Date()
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('eaasi_user_hash');
	}
};
