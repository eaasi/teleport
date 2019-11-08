import {CreatedAt, UpdatedAt, Column, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'unit_of_information'
})
export default class UnitOfInformation extends Model<UnitOfInformation> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@Column({
		type: DataTypes.STRING(64),
		allowNull: false,
		primaryKey: true,
	})
	label: string

	@Column({
		type: DataTypes.STRING(64),
		allowNull: true,
	})
	qid: string

	@Column({
		type: DataTypes.STRING(64),
		allowNull: false,
	})
	abbreviation: string
}
