import ConfiguredMachine from '@/data_access/models/configured/ConfiguredMachine';
import MachineInterface from '@/data_access/models/machine/MachineInterface';
import StorageDevice from '@/data_access/models/storage/StorageDevice';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'configured_storage_device'
})
export default class ConfiguredStorageDevice extends Model<ConfiguredStorageDevice> {
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
	id: number

	@ForeignKey(() => ConfiguredMachine)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false
	})
	configuredMachineID: number

	@ForeignKey(() => StorageDevice)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false
	})
	storageDeviceID: number

	@Column({
		type: DataTypes.INTEGER,
		allowNull: true
	})
	memoryBytes: number

	@Column({
		type: DataTypes.STRING,
		allowNull: true
	})
	irq: string

	@ForeignKey(() => MachineInterface)
	@Column({
		type: DataTypes.STRING,
		allowNull: true
	})
	uses_machineInterfaceID: string

	@Column({
		type: DataTypes.INTEGER,
		allowNull: true
	})
	bootOrder: number
}
