'use strict';

const Sequelize = require('sequelize');

export default class ColorDepth extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			colorDepthID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			colorDepthName: {
				type: Sequelize.STRING,
				allowNull: false
			},
			bitDepth: {
				type: Sequelize.INTEGER,
				allowNull: true
			}
		}, { sequelize, tableName: 'colorDepth' });
	};

	static associate(models) {
	}
}
