'use strict';
const Sq = require('sequelize');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.createTable('emulation_project', {
			createdAt: {
				type: Sq.DATE,
				defaultValue: new Date()
			},
			updatedAt: {
				type: Sq.DATE,
				defaultValue: new Date()
			},
			id: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			userId: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'eaasi_user',
					key: 'id'
				}
			},
		});
	},
	down: (queryInterface) => {
		return queryInterface.dropTable('emulation_project');
	}
};
