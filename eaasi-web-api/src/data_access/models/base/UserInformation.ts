import {CreatedAt, UpdatedAt, Column, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'user_information'
})
export default class UserInformation extends Model<UserInformation> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@Column({
		type: DataTypes.BIGINT,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true,
	})
	id: string

	@Column({
		type: DataTypes.STRING,
		allowNull: true,
	})
	username: string

	@Column({
		type: DataTypes.STRING,
		allowNull: true,
	})
	password: string

	@Column({
		type: DataTypes.STRING,
		allowNull: true,
	})
	organization: string

	@Column({
		type: DataTypes.BOOLEAN,
		allowNull: true,
	})
	admin: boolean
}
