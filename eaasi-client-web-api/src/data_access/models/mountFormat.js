'use strict';

const Sequelize = require('sequelize');

class MountFormat extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			mountFormatQID: {
				type: Sequelize.STRING,
				allowNull: false,
				primaryKey: true
			},
			mountFormatName: {
				type: Sequelize.STRING,
				allowNull: false
			}
		}, { sequelize, tableName: 'machineType' });
	};

	static associate(models) {
	}
};

module.exports = {
	MachineType: MountFormat
};
