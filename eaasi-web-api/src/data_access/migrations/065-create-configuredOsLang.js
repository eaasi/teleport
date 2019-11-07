'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('configured_os_language', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			configuredOsID: {
				type: Sq.INTEGER,
				allowNull: true,
				references: {
					model: 'configured_os',
					key: 'id'
				}
			},
			languageQid: {
				type: Sq.STRING(64),
				allowNull: true
			},
			isPrimaryLanguage: {
				type: Sq.BOOLEAN,
				allowNull: false,
				defaultValue: false
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('configured_os_language');
	}
};
