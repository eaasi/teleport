'use strict';

import {AudioDevice} from './audioDevice';

const Sequelize = require('sequelize');

class AudioDeviceHasMachineInterface extends Sequelize.Model {
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
			audioDevice_machineInterfaceID: {
				type: Sequelize.INTEGER,
				allowNull: false
			}
		}, { sequelize, tableName: 'audioDevice_has_machineInterface' });
	};

	static associate(models) {
		AudioDeviceHasMachineInterface.hasOne(AudioDevice, {foreignKey: 'audioDeviceID'});
	}
}

module.exports = {
	AudioDeviceHasMachineInterface: AudioDeviceHasMachineInterface
};
