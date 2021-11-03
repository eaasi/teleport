'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('format_implementation', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			id: {
				type: Sq.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			name: {
				type: Sq.STRING(32),
				allowNull: false
			},
			fileExtensionID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'file_extension',
					key: 'id'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		const query = 'DROP TABLE IF EXISTS format_implementation CASCADE;';
		return queryInterface.sequelize.query(query);
	}
};
