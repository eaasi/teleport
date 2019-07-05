'use strict';

import {GpuDevice} from './gpuDevice';

const Sequelize = require('sequelize');

class GpuDeviceHasDisplayInterface extends Sequelize.Model {
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
			displayInterface_displayInterfaceID: {
				type: Sequelize.INTEGER,
				allowNull: false
			}
		}, { sequelize, tableName: 'gpuDevice_has_displayInterface' });
	};

	static associate(models) {
		GpuDeviceHasDisplayInterface.hasOne(GpuDevice, {foreignKey: 'gpuDeviceID'});
	}
};

module.exports = {
	GpuDeviceHasDisplayInterface: GpuDeviceHasDisplayInterface
};
