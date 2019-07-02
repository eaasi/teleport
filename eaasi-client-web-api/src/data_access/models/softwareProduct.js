'use strict';

const Sequelize = require('sequelize');

class SoftwareProduct extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			softwareProductID: {
				type: Sequelize.INTEGER,
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
	};

	static associate(models) {
	}
};

module.exports = {
	SoftwareProduct: SoftwareProduct
};
