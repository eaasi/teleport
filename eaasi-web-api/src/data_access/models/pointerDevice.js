'use strict';

const Sequelize = require('sequelize');

class PointerDevice extends Sequelize.Model {}
module.exports = (sequelize) => {
	PointerDevice.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		pointerDeviceID: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		pointerDeviceQID: {
			type: Sequelize.STRING,
			allowNull: true
		},
		pointerDeviceName: {
			type: Sequelize.STRING,
			allowNull: false
		},
		pointerDeviceType: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'pointerDeviceType',
				key: 'pointerDeviceTypeID'
			}
		}
	}, { sequelize, tableName: 'pointerDevice' });
	PointerDevice.associate = models => {
		models.PointerDevice.hasOne(models.PointerDeviceType, {foreignKey: 'pointerDeviceTypeID'});
	};

	return PointerDevice;
};
