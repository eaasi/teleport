'use strict';

import {DisplayDevice} from './displayDevice';

const Sequelize = require('sequelize');

class DisplayDeviceHasColorDepth extends Sequelize.Model {
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
			colorDepth_colorDepthID: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: 'colorDepth',
					key: 'colorDepthID'
				}
			}
		}, { sequelize, tableName: 'displayDevice_has_colorDepth' });
	};

	static associate(models) {
		DisplayDeviceHasColorDepth.hasOne(DisplayDevice, {foreignKey: 'displayDeviceID'});
		DisplayDeviceHasColorDepth.hasOne(ColorDepth, {foreignKey: 'colorDepthID'});
	}
}

module.exports = {
	DisplayDeviceHasColorDepth: DisplayDeviceHasColorDepth
};
