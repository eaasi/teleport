'use strict';

const Sequelize = require('sequelize');

export default class CPUArchitecture extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			cpuArchitectureQID: {
				type: Sequelize.STRING,
				allowNull: false,
				primaryKey: true
			},
			cpuArchitectureName: {
				type: Sequelize.STRING,
				allowNull: false
			}
		}, { sequelize, tableName: 'configuredNetwork' });
	};

	static associate(models) {
	}
}
