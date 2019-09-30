'use strict';

const Sequelize = require('sequelize');

class UnitOfInformation extends Sequelize.Model {}

module.exports = (sequelize) => {
	UnitOfInformation.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		unitLabel: {
			type: Sequelize.STRING,
			allowNull: false,
			primaryKey: true,
		},
		unitAbbreviation: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		unitQID: {
			type: Sequelize.STRING,
			allowNull: true,
		},
	},
	{
		sequelize,
		tableName: 'unitOfInformation'
	});

	return UnitOfInformation;
};
