import {CreatedAt, UpdatedAt, Column, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'developer'
})
export default class Developer extends Model<Developer> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@Column({
		type: DataTypes.STRING(64),
		primaryKey: true,
		allowNull: false,
		unique: true,
	})
	qid: string;

	@Column({
		type: DataTypes.STRING(64),
		allowNull: false
	})
	label: string;
}
