'use strict';

const Sequelize = require('sequelize');

class MachineInterface extends Sequelize.Model {}
module.exports = (sequelize) => {
	MachineInterface.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		machineInterfaceID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		machineInterfaceQID: {
			type: Sequelize.STRING(45),
		},
		machineInterfaceLabel: {
			type: Sequelize.STRING,
		},
		machineInterfaceBandwidth: {
			type: Sequelize.INTEGER,
		},
		machineInterfaceBandwidthUnit: {
			type: Sequelize.STRING,
		},
	}, { sequelize, tableName: 'machineInterface' });
	return MachineInterface;
};
