'use strict';

const Sequelize = require('sequelize');

class CpuArchitecture extends Sequelize.Model {}
module.exports = (sequelize) => {
	CpuArchitecture.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
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
	return CpuArchitecture;
};

