import {CreatedAt, UpdatedAt, Column, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'language'
})
export default class Language extends Model<Language> {
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
