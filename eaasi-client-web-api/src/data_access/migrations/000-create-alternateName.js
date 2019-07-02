const Sq = require('sequelize');

'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('alternateName', {
			alternateNameID: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sq.INTEGER
			},
			alternateName: {
				allowNull: false,
				type: Sq.STRING
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('aaaTests');
	}
};
