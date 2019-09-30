'use strict';

const Sequelize = require('sequelize');

class NetworkDeviceHasDriverSoftware extends Sequelize.Model {}
module.exports = (sequelize) => {
	NetworkDeviceHasDriverSoftware.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		networkDevice_networkDeviceID: {
			type: Sequelize.INTEGER,
			allowNull: true,
			references: {
				model: 'networkDevice',
				key: 'networkDeviceID'
			}
		},
		driverSoftware_driverSoftware: {
			type: Sequelize.STRING,
			allowNull: true,
			references: {
				model: 'softwareVersion',
				key: 'softwareVersionID'
			}
		}
	}, { sequelize, tableName: 'networkDevice_has_driverSoftware' });
	NetworkDeviceHasDriverSoftware.associate = models => {
		models.NetworkDeviceHasDriverSoftware.hasOne(models.NetworkDevice, {foreignKey: 'networkDeviceID'});
		models.NetworkDeviceHasDriverSoftware.hasOne(models.SoftwareVersion, {foreignKey: 'softwareVersionID'});
	};
	return NetworkDeviceHasDriverSoftware;
};
