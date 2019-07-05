'use strict';

import {GpuDevice} from './gpuDevice';

const Sequelize = require('sequelize');

class GpuDeviceHasEquivalent extends Sequelize.Model {
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
			gpuDevice_equivalentGpuDevice: {
				type: Sequelize.INTEGER,
				allowNull: false
			}
		}, { sequelize, tableName: 'gpuDevice_has_equivalent' });
	};

	static associate(models) {
		GpuDeviceHasEquivalent.hasOne(GpuDevice, {foreignKey: 'gpuDeviceID'});
	}
};

module.exports = {
	GpuDeviceHasEquivalent: GpuDeviceHasEquivalent
};
