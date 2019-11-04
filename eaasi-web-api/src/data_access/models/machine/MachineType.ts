import {CreatedAt, UpdatedAt, Column, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'machine_type'
})
export default class MachineType extends Model<MachineType> {
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
		allowNull: false,
	})
	label: string
}
