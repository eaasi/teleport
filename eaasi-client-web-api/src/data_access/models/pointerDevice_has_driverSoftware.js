'use strict';

const Sequelize = require('sequelize');

class PointerDeviceHasDriverSoftware extends Sequelize.Model {}
module.exports = (sequelize) => {
	PointerDeviceHasDriverSoftware.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		pointerDevice_pointerDeviceID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'pointerDevice',
				key: 'pointerDeviceID'
			}
		},
		pointerDevice_driverSoftwareID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'softwareVersion',
				key: 'softwareVersionID'
			}
		}
	}, { sequelize, tableName: 'pointerDevice_has_driverSoftware' });
	PointerDeviceHasDriverSoftware.associate = models => {
		models.PointerDeviceHasDriverSoftware.hasOne(models.PointerDevice, {foreignKey: 'pointerDeviceID'});
	};

	return PointerDeviceHasDriverSoftware;
};
