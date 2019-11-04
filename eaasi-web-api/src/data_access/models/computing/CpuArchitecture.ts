import {CreatedAt, UpdatedAt, Column, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'cpu_architecture'
})
export default class CpuArchitecture extends Model<CpuArchitecture> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@Column({
		type: DataTypes.STRING,
		primaryKey: true,
		allowNull: false,
	})
	qid: string

	@Column({
		type: DataTypes.STRING,
		allowNull: true
	})
	label: string
}
