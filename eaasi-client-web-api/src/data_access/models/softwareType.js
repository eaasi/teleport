'use strict';

const Sequelize = require('sequelize');

class SoftwareType extends Sequelize.Model {}
module.exports = (sequelize) => {
	SoftwareType.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		softwareTypeQID: {
			type: Sequelize.STRING,
			allowNull: false,
			primaryKey: true
		},
		softwareTypeName: {
			type: Sequelize.STRING,
			allowNull: false
		}
	}, { sequelize, tableName: 'softwareType' });
	return SoftwareType;
};
