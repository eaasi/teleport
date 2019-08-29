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
		createdAt: {
			type: Sequelize.DATE,
			defaultValue: new Date()
		},
		updatedAt: {
			type: Sequelize.DATE,
			defaultValue: new Date()
		},
		roleName: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
			columnName: 'role_name',
		},
		roleDescription: {
			type: Sequelize.STRING(100),
			allowNull: false,
			columnName: 'role_description'
		}
	}, { sequelize, tableName: 'eaasi_role' }
	);

	return EaasiRole;
};
