import {CreatedAt, UpdatedAt, Column, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'file_format'
})
export default class FileFormat extends Model<FileFormat> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@Column({
		type: DataTypes.STRING(64),
		allowNull: false,
		primaryKey: true,
	})
	qid: string;

	@Column({
		type: DataTypes.STRING(64),
		allowNull: false,
	})
	label: string;
}
