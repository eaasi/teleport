'use strict';

const Sequelize = require('sequelize');

class MachineType extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			machineTypeID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			machineTypeName: {
				type: Sequelize.STRING,
				allowNull: false
			}
		}, { sequelize, tableName: 'machineType' });
	};

	static associate(models) {
	}
};

module.exports = {
	MachineType: MachineType
};
