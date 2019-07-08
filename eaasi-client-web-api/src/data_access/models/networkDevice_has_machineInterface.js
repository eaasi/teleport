'use strict';

const Sequelize = require('sequelize');

class NetworkDeviceHasMachineInterface extends Sequelize.Model {}
module.exports = (sequelize) => {
	NetworkDeviceHasMachineInterface.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		networkDevice_networkDeviceID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'networkDevice',
				key: 'networkDeviceID'
			}
		},
		networkDevice_machineInterfaceID: {
			type: Sequelize.INTEGER,
			allowNull: true
		}
	}, { sequelize, tableName: 'networkDevice_has_machineInterface' });
	NetworkDeviceHasMachineInterface.associate = models => {
		models.NetworkDeviceHasMachineInterface.hasOne(models.NetworkDevice, {foreignKey: 'networkDeviceID'});
	}
	return NetworkDeviceHasMachineInterface;
};
