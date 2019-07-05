'use strict';

import {DisplayResolution} from './displayResolution';
import {DisplayDevice} from './displayDevice';

const Sequelize = require('sequelize');

class DisplayDeviceHasDisplayResolution extends Sequelize.Model {
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
			availableDisplayResolution: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'displayResolution',
					key: 'displayResolutionID'
				}
			}
		}, { sequelize, tableName: 'displayDevice_has_displayResolution' });
	};

	static associate(models) {
		DisplayDeviceHasDisplayResolution.hasOne(DisplayDevice, {foreignKey: 'displayDeviceID'});
		DisplayDeviceHasDisplayResolution.hasOne(DisplayResolution, {foreignKey: 'displayResolutionID'});
	}
}

module.exports = {
	DisplayDeviceHasDisplayResolution: DisplayDeviceHasDisplayResolution
};
