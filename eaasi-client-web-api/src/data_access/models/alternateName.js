'use strict';

const Sequelize = require('sequelize');

class AlternateName extends Sequelize.Model {}

module.exports = (sequelize) => {
	AlternateName.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		alternateNameID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		alternateName: {
			type: Sequelize.STRING,
			allowNull: false,
		},
	},
	{
		sequelize,
		tableName: 'alternateName'
	});

	return AlternateName;
};
