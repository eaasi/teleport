'use strict';

const Sequelize = require('sequelize');

class AudioDeviceHasEquivalent extends Sequelize.Model {
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
			audioDevice_equivalentAudioDevice: {
				type: Sequelize.INTEGER,
				allowNull: false
			}
		}, { sequelize, tableName: 'audioDevice_has_equivalent' });
	};

	static associate(models) {
	}
}

module.exports = {
	AudioDeviceHasEquivalent: AudioDeviceHasEquivalent
};
