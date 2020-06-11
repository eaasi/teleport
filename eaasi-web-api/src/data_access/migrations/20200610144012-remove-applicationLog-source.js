'use strict';

module.exports = {

	up: (queryInterface) => {
		return queryInterface.removeColumn('application_log', 'source');
	},

	down: (queryInterface, Sequelize) => {
		queryInterface.addColumn(
			'application_log',
			'source',
			{
				type: Sequelize.STRING(64),
				allowNull: true,
			},
		);
	}
}