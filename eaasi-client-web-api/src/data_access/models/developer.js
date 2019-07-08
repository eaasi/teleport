'use strict';

const Sequelize = require('sequelize');

class Developer extends Sequelize.Model {}
module.exports = (sequelize) => {
	Developer.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		developerQID: {
			type: Sequelize.STRING,
			allowNull: false,
			primaryKey: true
		},
		developerName: {
			type: Sequelize.STRING,
			allowNull: false
		}
	}, { sequelize, tableName: 'developer' });
	return Developer;
}
