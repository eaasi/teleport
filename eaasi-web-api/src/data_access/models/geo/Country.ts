import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'Country.ts'
})
export default class Country extends Model<Country> {
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

	@Column({
		type: DataTypes.STRING,
		allowNull: true
	})
	iso31661_numeric_code: string
}
