import {CreatedAt, UpdatedAt, Column, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'timezone'
})
export default class Timezone extends Model<Timezone> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@Column({
		type: DataTypes.STRING(64),
		allowNull: false,
		primaryKey: true
	})
	qid: string

	@Column({
		type: DataTypes.STRING(64),
		allowNull: false,
	})
	utcOffset: string
}
