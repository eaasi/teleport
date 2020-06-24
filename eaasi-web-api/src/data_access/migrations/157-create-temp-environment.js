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
			envId: {
				type: Sq.STRING,
				allowNull: false,
				primaryKey: true,
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
