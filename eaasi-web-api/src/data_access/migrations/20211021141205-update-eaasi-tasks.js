'use strict';

const Sq = require('sequelize');
const TABLE_NAME = 'eaasi_task';

const columns = [
	{
		name: 'tenantId',
		options: {
			type: Sq.STRING(128),
			allowNull: true
		}
	},
	{
		name: 'type',
		options: {
			type: Sq.STRING(50),
			allowNull: true
		}
	},
];

module.exports = {
	up: async (queryInterface) => {
		for (const column of columns)
			await queryInterface.addColumn(TABLE_NAME, column.name, column.options);

		return Promise.resolve(true);
	},
	down: async (queryInterface) => {
		for (const column of columns)
			await queryInterface.removeColumn(TABLE_NAME, column.name);

		return Promise.resolve(true);
	}
};
