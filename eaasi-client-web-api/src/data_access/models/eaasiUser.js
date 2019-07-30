'use strict';

const Sequelize = require('sequelize');

class EaasiUser extends Sequelize.Model {
}

module.exports = (sequelize) => {
	EaasiUser.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		id: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		username: {
			type: Sequelize.STRING,
			allowNull: false,
			columnName: 'username'
		},
		firstName: {
			type: Sequelize.STRING,
			allowNull: true,
			columnName: 'first_name'
		},
		roleId: {
			type: Sequelize.STRING,
			allowNull: true,
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
