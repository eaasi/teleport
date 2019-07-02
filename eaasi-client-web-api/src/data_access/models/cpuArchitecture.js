'use strict';

const Sequelize = require('sequelize');

class CpuArchitecture extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
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
	};

	static associate(models) {
	}
}

module.exports = {
	CpuArchitecture: CpuArchitecture
};
