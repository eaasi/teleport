'use strict';

const Sequelize = require('sequelize');

class EaasiUser extends Sequelize.Model {
}

module.exports = (sequelize) => {
	EaasiUser.init({
		createdAt: {
			type: Sequelize.DATE,
			defaultValue: new Date()
		},
		updatedAt: {
			type: Sequelize.DATE,
			defaultValue: new Date()
		},
		id: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		username: {
			type: Sequelize.STRING(50),
			allowNull: false,
			columnName: 'username'
		},
		firstName: {
			type: Sequelize.STRING(50),
			allowNull: true,
			columnName: 'first_name'
		},
		lastName: {
			type: Sequelize.STRING(50),
			allowNull: true,
			columnName: 'last_name'
		},
		email: {
			type: Sequelize.STRING(200),
			allowNull: false,
			columnName: 'email',
			unique: true
		},
		roleId: {
			type: Sequelize.STRING,
			allowNull: false,
			columnName: 'role_id',
			references: {
				model: 'eaasi_role',
				key: 'id'
			}
		},
		lastLogin: {
			type: Sequelize.DATE,
			allowNull: true
		}
	}, { sequelize, tableName: 'eaasi_user' });

	EaasiUser.associate = (models) => {
		models.EaasiUser.hasOne(models.EaasiRole, {foreignKey: 'id'});
	};

	return EaasiUser;
};
