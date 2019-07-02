'use strict';

const Sequelize = require('sequelize');

export default class DigitalObject extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			digitalObjectID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			digitalObjectName: {
				type: Sequelize.STRING,
				allowNull: true
			},
			digitalObjectDescription: {
				type: Sequelize.STRING,
				allowNull: true
			},
			digitalObjectProductKey: {
				type: Sequelize.STRING,
				allowNull: true
			},
			digitalObjectHelpText: {
				type: Sequelize.TEXT,
				allowNull: true
			},
			digitalObjectSystemRequirements: {
				type: Sequelize.INTEGER,
				allowNull: true
			}
		}, { sequelize, tableName: 'digitalObject' });
	};

	static associate(models) {
	}
}
