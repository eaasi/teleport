import {CreatedAt, UpdatedAt, Column, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'processor_device'
})
export default class ProcessorDevice extends Model<ProcessorDevice> {
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
		type: DataTypes.STRING(64),
		allowNull: true,
	})
	qid: string

	@Column({
		type: DataTypes.STRING(64),
		allowNull: false,
	})
	name: string

	@Column({
		type: DataTypes.INTEGER,
		allowNull: true,
	})
	frequency: number

	@Column({
		type: DataTypes.STRING(16),
		allowNull: true,
	})
	frequencyUnit: string

	@Column({
		type: DataTypes.STRING(64),
		allowNull: true,
	})
	cpuArchitecture: string
}
