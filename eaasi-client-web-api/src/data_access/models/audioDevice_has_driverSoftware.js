'use strict';

import {AudioDevice} from './audioDevice';
import {SoftwareVersion} from './softwareVersion';

const Sequelize = require('sequelize');

class AudioDeviceHasDriverSoftware extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			audioDevice_audioDeviceID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'audioDevice',
					key: 'audioDeviceID'
				}
			},
			audioDevice_driverSoftwareID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'softwareVersion',
					key: 'softwareVersionID'
				}
			}
		}, { sequelize, tableName: 'audioDevice_has_driverSoftware' });
	};

	static associate(models) {
		AudioDeviceHasDriverSoftware.hasOne(AudioDevice, {foreignKey: 'audioDeviceID'});
		AudioDeviceHasDriverSoftware.hasOne(SoftwareVersion, {foreignKey: 'softwareVersionID'});
	}
}

module.exports = {
	AudioDeviceHasDriverSoftware: AudioDeviceHasDriverSoftware
};
