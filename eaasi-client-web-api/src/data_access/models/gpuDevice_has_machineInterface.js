'use strict';

import {GpuDevice} from './gpuDevice';

const Sequelize = require('sequelize');

class GpuDeviceHasMachineInterface extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			gpuDevice_gpuDeviceID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'gpuDevice',
					key: 'gpuDeviceID'
				}
			},
			gpuDevice_machineInterfaceID: {
				type: Sequelize.INTEGER,
				allowNull: false
			}
		}, { sequelize, tableName: 'gpuDevice_has_machineInterface' });
	};

	static associate(models) {
		GpuDeviceHasMachineInterface.hasOne(GpuDevice, {foreignKey: 'gpuDeviceID'});
	}
};

module.exports = {
	GpuDeviceHasMachineInterface: GpuDeviceHasMachineInterface
};
