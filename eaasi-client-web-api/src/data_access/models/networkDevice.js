'use strict';

const Sequelize = require('sequelize');

class NetworkDevice extends Sequelize.Model {}
module.exports = (sequelize) => {
	NetworkDevice.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		networkDeviceID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		networkDeviceQID: {
			type: Sequelize.STRING,
			allowNull: true
		},
		networkDeviceName: {
			type: Sequelize.STRING,
			allowNull: false
		}
	}, { sequelize, tableName: 'networkDevice' });

	return NetworkDevice;
};
