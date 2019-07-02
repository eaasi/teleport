const Sq = require('sequelize');

'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('fileFormat', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			fileFormatQID: {
				type: Sq.STRING,
				allowNull: false,
				primaryKey: true
			},
			fileFormatName: {
				type: Sq.STRING,
				allowNull: true
			},
			pronomID: {
				type: Sq.STRING,
				allowNull: true
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('fileFormat');
	}
};
