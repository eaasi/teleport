'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('formatImplementation_includes_fileFormat', {
			createdAt: Sq.DATE,
			updatedAt: Sq.DATE,
			formatImplementation_formatImplementationID: {
				type: Sq.INTEGER,
				allowNull: false,
				references: {
					model: 'formatImplementation',
					key: 'formatImplementationID'
				}
			},
			fileFormat_fileFormatQID: {
				type: Sq.STRING,
				allowNull: false,
				references: {
					model: 'fileFormat',
					key: 'fileFormatQID'
				}
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('formatImplementation_includes_fileFormat');
	}
};
