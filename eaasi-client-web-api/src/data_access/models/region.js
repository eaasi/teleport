'use strict';

const Sequelize = require('sequelize');

class Region extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
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
	};

	static associate(models) {
	}
};

module.exports = {
	Region: Region
};
