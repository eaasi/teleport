'use strict';
const Sq = require('sequelize');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.createTable('temp_environment', {
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
			envId: {
				type: Sq.STRING,
				allowNull: false,
			},
			userId: {
				type: Sq.STRING(50),
				allowNull: false,
			},
		});
	},
	down: (queryInterface) => {
		return queryInterface.dropTable('emulation_project');
	}
};
