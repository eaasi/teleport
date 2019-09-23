'use strict';

const Sequelize = require('sequelize');

class SoftwareProduct extends Sequelize.Model {}
module.exports = (sequelize) => {
	SoftwareProduct.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		softwareProductID: {
			type: Sequelize.STRING,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		softwareProductQID: {
			type: Sequelize.STRING,
			allowNull: false
		},
		softwareProductName: {
			type: Sequelize.STRING,
			allowNull: false
		},
		isOperatingSystem: {
			type: Sequelize.BOOLEAN,
			allowNull: false,
			defaultValue: false
		}
	}, { sequelize, tableName: 'softwareProduct' });

	return SoftwareProduct;
};
