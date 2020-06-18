'use strict';
const Sq = require('sequelize');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.createTable('emulation_project_resource', {
			id: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			createdAt: {
				type: Sq.DATE,
				defaultValue: new Date()
			},
			emulationProjectId: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'emulation_project',
					key: 'id'
				}
			},
			resourceId: {
				type: Sq.STRING,
				allowNull: false,
			},
			resourceType: {
				type: Sq.STRING,
				allowNull: false,
			},
		});
	},
	down: (queryInterface) => {
		return queryInterface.dropTable('emulation_project_resource');
	}
};
