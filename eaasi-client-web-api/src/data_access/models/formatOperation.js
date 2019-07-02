'use strict';

const Sequelize = require('sequelize');

export default class FormatOperation extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			operationID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			operationName: {
				type: Sequelize.STRING,
				allowNull: false
			}
		}, { sequelize, tableName: 'formatOperation' });
	};

	static associate(models) {
	}
}
