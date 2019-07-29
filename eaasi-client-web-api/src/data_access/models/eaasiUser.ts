'use strict';

const Sequelize = require('sequelize');

class EaasiUser extends Sequelize.Model {
	public id!: number;
	public createdAt!: Date;
	public updatedAt!: Date;
	public username!: string;
	public firstName!: string;
	public roleId!: number;
	public lastLogin!: Date;
}

module.exports = (sequelize: any) => {
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

	EaasiUser.associate = (models: any) => {
		models.EaasiUser.hasOne(models.EaasiRole, {foreignKey: 'id'});
	};

	return EaasiUser;
};
