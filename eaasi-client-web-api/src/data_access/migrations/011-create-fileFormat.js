const Sq = require('sequelize');

'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('fileFormat', {
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
