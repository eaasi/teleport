'use strict';

const Sequelize = require('sequelize');

class DisplayDeviceHasDriverSoftware extends Sequelize.Model {}
module.exports = (sequelize) => {
	DisplayDeviceHasDriverSoftware.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		displayDevice_displayDeviceID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'displayDevice',
				key: 'displayDeviceID'
			}
		},
		displayDevice_driverSoftwareID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'softwareVersion',
				key: 'softwareVersionID'
			}
		}
	}, { sequelize, tableName: 'displayDevice_has_driverSoftware' });
	DisplayDeviceHasDriverSoftware.associate = models => {
		models.DisplayDeviceHasDriverSoftware.hasOne(models.DisplayDevice, {foreignKey: 'displayDeviceID'});
		models.DisplayDeviceHasDriverSoftware.hasOne(models.SoftwareVersion, {foreignKey: 'softwareVersionID'});
	}
	return DisplayDeviceHasDriverSoftware;
};
