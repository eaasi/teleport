'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('systemRequirements_requires_keyboardDevice', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			systemRequirements_systemRequirementsID: {
				type: Sq.STRING,
				allowNull: false,
				references: {
					model: 'systemRequirements',
					key: 'systemRequirementsID'
				}
			},
			systemRequirements_requiresKeyboardDeviceID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'keyboardDevice',
					key: 'keyboardDeviceID'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('systemRequirements_requires_keyboardDevice');
	}
};
