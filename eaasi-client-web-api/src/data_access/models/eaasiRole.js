'use strict';

const Sequelize = require('sequelize');

class EaasiRole extends Sequelize.Model {}

module.exports = (sequelize) => {
	EaasiRole.init({
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			roleName: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
				columnName: 'role_name',
			},
		}, { sequelize, tableName: 'eaasi_role' }
	);

	return EaasiRole;
};
