import StorageDeviceType from '@/data_access/models/storage/StorageDeviceType';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'storage_device'
})
export default class StorageDevice extends Model<StorageDevice> {
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

	@ForeignKey(() => StorageDeviceType)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: true
	})
	storageDeviceTypeID: number;

	@Column({
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: false
	})
	isReadable: boolean;

	@Column({
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: false
	})
	isWritable: boolean;
}
