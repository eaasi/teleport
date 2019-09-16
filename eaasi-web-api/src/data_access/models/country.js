'use strict';

const Sequelize = require('sequelize');

class Country extends Sequelize.Model {}

module.exports = (sequelize) => {
	Country.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		countryQID: {
			type: Sequelize.STRING,
			allowNull: false,
			primaryKey: true,
		},
		countryLabel: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		iso31661_numericCode: {
			type: Sequelize.INTEGER,
		},
	},
	{
		sequelize,
		tableName: 'country'
	});

	return Country;
};
