import {CreatedAt, UpdatedAt, Column, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'frequencyUnit'
})
export default class FrequencyUnit extends Model<FrequencyUnit> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@Column({
		type: DataTypes.STRING,
		allowNull: false,
	})
	label: string

	@Column({
		type: DataTypes.STRING,
		allowNull: false,
	})
	qid: string
}
