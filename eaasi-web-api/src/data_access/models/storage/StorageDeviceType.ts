import {CreatedAt, UpdatedAt, Column, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'storage_device_type'
})
export default class StorageDeviceType extends Model<StorageDeviceType> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@Column({
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	})
	id: number;

	@Column({
		type: DataTypes.STRING(64),
		allowNull: false,
	})
	qid: string;

	@Column({
		type: DataTypes.STRING(128),
		allowNull: true
	})
	label: string;
}
