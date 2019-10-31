'use strict';

const Sequelize = require('sequelize');

class Country extends Sequelize.Model {}

module.exports = (sequelize) => {
	Country.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		countryQID: {
			type: Sequelize.STRING,
			primaryKey: true,
		},
		countryLabel: {
			type: Sequelize.STRING,
		},
		iso31661_numericCode: {
			type: Sequelize.STRING,
		}
	},

	{
		sequelize,
		tableName: 'country'
	});

	return Country;
};
