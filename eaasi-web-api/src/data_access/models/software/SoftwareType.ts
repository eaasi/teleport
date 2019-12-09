import {CreatedAt, UpdatedAt, Column, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'software_type'
})
export class SoftwareType extends Model<SoftwareType> {
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
		allowNull: true,
	})
	name: string;
}
