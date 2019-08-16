'use strict';

const Sequelize = require('sequelize');

class MachineType extends Sequelize.Model {}
module.exports = (sequelize) => {
	MachineType.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
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
	return MachineType;
};
