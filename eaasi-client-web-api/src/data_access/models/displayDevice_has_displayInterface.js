'use strict';

import {DisplayDevice} from './displayDevice';

const Sequelize = require('sequelize');

class DisplayDeviceHasDisplayInterface extends Sequelize.Model {
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
			displayInterface_displayInterfaceID: {
				type: Sequelize.INTEGER,
				allowNull: true
			}
		}, { sequelize, tableName: 'displayDevice_has_displayInterface' });
	};

	static associate(models) {
		DisplayDeviceHasDisplayInterface.hasOne(DisplayDevice, {foreignKey: 'displayDeviceID'});
	}
}

module.exports = {
	DisplayDeviceHasDisplayInterface: DisplayDeviceHasDisplayInterface
};
