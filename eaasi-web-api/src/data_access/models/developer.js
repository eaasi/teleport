'use strict';

const Sequelize = require('sequelize');

class Developer extends Sequelize.Model {}
module.exports = (sequelize) => {
	Developer.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		developerID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		developerQID: {
			type: Sequelize.STRING,
		},
		developerLabel: {
			type: Sequelize.STRING,
			allowNull: false
		}
	}, { sequelize, tableName: 'developer' });
	return Developer;
};
