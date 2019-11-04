import {CreatedAt, UpdatedAt, Column, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'softwareObject'
})
export default class SoftwareObject extends Model<SoftwareObject> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@Column({
		type: DataTypes.BIGINT,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true
	})
	id: number

	@Column({
		type: DataTypes.BOOLEAN,
		allowNull: true,
	})
	inNetwork: boolean

	@Column({
		type: DataTypes.BIGINT,
		allowNull: true,
	})
	hasSourceOrg: number

	@Column({
		type: DataTypes.STRING,
		allowNull: true,
	})
	productKey: string

	@Column({
		type: DataTypes.TEXT,
		allowNull: true,
	})
	helpText: string
}
