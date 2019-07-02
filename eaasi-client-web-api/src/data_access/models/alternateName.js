'use strict';

const Sequelize = require('sequelize');

export default class AlternateName extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
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
		}, { sequelize, tableName: 'alternateName' });
	};

	static associate(models) {
	}
}
