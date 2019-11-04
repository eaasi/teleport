import {CreatedAt, UpdatedAt, Column, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'gpu_device'
})
export default class GpuDevice extends Model<GpuDevice> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@Column({
		type: DataTypes.NUMBER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	})
	id: string

	@Column({
		type: DataTypes.STRING,
		allowNull: true
	})
	qid: string

	@Column({
		type: DataTypes.STRING,
		allowNull: true
	})
	name: string
}
