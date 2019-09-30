'use strict';

const Sequelize = require('sequelize');

class CpuArchitecture extends Sequelize.Model {}
module.exports = (sequelize) => {
	CpuArchitecture.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		cpuArchitectureID: {
			type: Sequelize.INTEGER,
			primaryKey: true
		},
		cpuArchitectureQID: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		cpuArchitectureLabel: {
			type: Sequelize.STRING,
			allowNull: false
		}
	}, { sequelize, tableName: 'configuredNetwork' });
	return CpuArchitecture;
};

