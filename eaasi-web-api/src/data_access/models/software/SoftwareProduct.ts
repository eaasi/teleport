import {CreatedAt, UpdatedAt, Column, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'software_product'
})
export default class SoftwareProduct extends Model<SoftwareProduct> {
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
		type: DataTypes.STRING,
		allowNull: true,
	})
	name: string

	@Column({
		type: DataTypes.BOOLEAN,
		allowNull: true,
	})
	isOperatingSystem: boolean
}
