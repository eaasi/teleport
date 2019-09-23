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
		softwareProductDescription: {
			type: Sequelize.STRING,
			allowNull: true
		},
		softwareProductName: {
			type: Sequelize.STRING,
			allowNull: false
		}
	}, { sequelize, tableName: 'softwareProduct' });

	return SoftwareProduct;
};
