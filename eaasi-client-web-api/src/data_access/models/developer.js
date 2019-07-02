'use strict';

const Sequelize = require('sequelize');

export default class Developer extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			developerQID: {
				type: Sequelize.STRING,
				allowNull: false,
				primaryKey: true
			},
			developerName: {
				type: Sequelize.STRING,
				allowNull: false
			}
		}, { sequelize, tableName: 'developer' });
	};
  
	static associate(models) {
	}
}
