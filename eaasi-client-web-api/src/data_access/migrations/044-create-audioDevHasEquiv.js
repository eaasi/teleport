const Sq = require('sequelize');

'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('audioDevice_has_equivalent', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			audioDevice_audioDeviceID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'audioDevice',
					key: 'audioDeviceID'
				}
			},
			audioDevice_equivalentAudioDevice: {
				type: Sq.INTEGER,
				allowNull: false
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('audioDevice_has_equivalent');
	}
};
