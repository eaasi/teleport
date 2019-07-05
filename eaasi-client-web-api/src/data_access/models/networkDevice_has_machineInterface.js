'use strict';

import {NetworkDevice} from './networkDevice';

const Sequelize = require('sequelize');

class NetworkDeviceHasMachineInterface extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
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
	};

	static associate(models) {
		NetworkDeviceHasMachineInterface.hasOne(NetworkDevice, {foreignKey: 'networkDeviceID'});
	}
};

module.exports = {
	NetworkDeviceHasMachineInterface: NetworkDeviceHasMachineInterface
};
