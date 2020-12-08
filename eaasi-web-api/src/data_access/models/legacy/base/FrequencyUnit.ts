import {CreatedAt, UpdatedAt, Column, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'frequency_unit'
})
export class FrequencyUnit extends Model<FrequencyUnit> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@Column({
		type: DataTypes.STRING(64),
		allowNull: false,
	})
	label: string

	@Column({
		type: DataTypes.STRING(64),
		allowNull: false,
	})
	qid: string
}
