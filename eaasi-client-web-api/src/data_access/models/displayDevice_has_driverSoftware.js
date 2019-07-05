'use strict';

import {DisplayDevice} from './displayDevice';
import {SoftwareVersion} from './softwareVersion';

const Sequelize = require('sequelize');

class DisplayDeviceHasDriverSoftware extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
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
	};

	static associate(models) {
		DisplayDeviceHasDriverSoftware.hasOne(DisplayDevice, {foreignKey: 'displayDeviceID'});
		DisplayDeviceHasDriverSoftware.hasOne(SoftwareVersion, {foreignKey: 'softwareVersionID'});
	}
}

module.exports = {
	DisplayDeviceHasDriverSoftware: DisplayDeviceHasDriverSoftware
};
