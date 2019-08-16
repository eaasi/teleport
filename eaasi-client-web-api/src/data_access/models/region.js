'use strict';

const Sequelize = require('sequelize');

class Region extends Sequelize.Model {}
module.exports = (sequelize) => {
	Region.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		regionQID: {
			type: Sequelize.STRING,
			allowNull: false,
			primaryKey: true
		},
		regionName: {
			type: Sequelize.STRING,
			allowNull: false
		},
		iso31661_numericCode: {
			type: Sequelize.INTEGER,
			allowNull: true
		}
	}, { sequelize, tableName: 'region' });
	return Region;
};

