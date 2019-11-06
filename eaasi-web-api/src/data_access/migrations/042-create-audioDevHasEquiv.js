'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('audio_device_has_equivalent', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			audioDevice_audioDeviceID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'audio_device',
					key: 'id'
				}
			},
			audioDevice_equivalentAudioDevice: {
				type: Sq.INTEGER,
				allowNull: false
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('audio_device_has_equivalent');
	}
};
