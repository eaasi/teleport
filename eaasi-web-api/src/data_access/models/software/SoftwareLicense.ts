import {CreatedAt, UpdatedAt, Column, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'software_license'
})
export default class SoftwareLicense extends Model<SoftwareLicense> {
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
	id: number;

	@Column({
		type: DataTypes.STRING(64),
		allowNull: false,
	})
	qid: string;

	@Column({
		type: DataTypes.STRING(128),
		allowNull: false,
	})
	label: string;
}
