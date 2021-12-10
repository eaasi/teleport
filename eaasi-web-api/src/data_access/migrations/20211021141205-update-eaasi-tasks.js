'use strict';

const Sq = require('sequelize');
const { getColumnNames } = require('./utils/postgresql');

const TABLE_NAME = 'eaasi_task';

const COLUMNS = [
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
		const names = await getColumnNames(TABLE_NAME, queryInterface);
		for (const column of COLUMNS) {
			if (names.has(column.name)) {
				console.info('Column "' + column.name + '" already exists! Skipping it...');
				continue;
			}

			await queryInterface.addColumn(TABLE_NAME, column.name, column.options);
		}

		return Promise.resolve(true);
	},
	down: async (queryInterface) => {
		for (const column of COLUMNS)
			await queryInterface.removeColumn(TABLE_NAME, column.name);

		return Promise.resolve(true);
	}
};
