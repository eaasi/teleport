import {CreatedAt, UpdatedAt, Column, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'pointer_device_type'
})
export default class PointerDeviceType extends Model<PointerDeviceType> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true
	})
	id: number

	@Column({
		type: DataTypes.STRING,
		allowNull: true,
	})
	qid: string

	@Column({
		type: DataTypes.INTEGER,
		allowNull: true,
	})
	label: number
}
