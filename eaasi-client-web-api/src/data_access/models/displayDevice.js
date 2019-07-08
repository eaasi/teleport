'use strict';

const Sequelize = require('sequelize');

class DisplayDevice extends Sequelize.Model {}
	module.exports = (sequelize) => {
	DisplayDevice.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		displayDeviceID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		displayDeviceQID: {
			type: Sequelize.STRING,
			allowNull: true
		},
		displayDeviceName: {
			type: Sequelize.STRING,
			allowNull: true
		}
	}, { sequelize, tableName: 'displayDevice' });
	return DisplayDevice;
}
