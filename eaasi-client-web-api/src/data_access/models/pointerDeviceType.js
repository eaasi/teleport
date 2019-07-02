'use strict';

const Sequelize = require('sequelize');

class PointerDeviceType extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			pointerDeviceTypeID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			pointerDeviceTypeName: {
				type: Sequelize.STRING,
				allowNull: false
			},
			pointerDeviceTypeQID: {
				type: Sequelize.STRING,
				allowNull: true
			}
		}, { sequelize, tableName: 'pointerDeviceType' });
	};

	static associate(models) {
	}
};

module.exports = {
	PointerDeviceType: PointerDeviceType
};
