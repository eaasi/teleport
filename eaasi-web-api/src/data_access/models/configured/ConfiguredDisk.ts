import ConfiguredMachine from '@/data_access/models/configured/ConfiguredMachine';
import File from '@/data_access/models/file/File';
import MachineInterface from '@/data_access/models/machine/MachineInterface';
import StorageDevice from '@/data_access/models/storage/StorageDevice';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'configured_disk'
})
export default class ConfiguredDisk extends Model<ConfiguredDisk> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@ForeignKey(() => File)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	diskImageFileID: number;

	@ForeignKey(() => ConfiguredMachine)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: true
	})
	configuredMachineID: number;

	@ForeignKey(() => StorageDevice)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: true
	})
	storageDeviceID: number;

	@ForeignKey(() => MachineInterface)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: true
	})
	uses_machineInterfaceID: number;

	@Column({
		type: DataTypes.INTEGER,
		allowNull: true
	})
	diskVolume: number;

	@Column({
		type: DataTypes.INTEGER,
		allowNull: true
	})
	remainingVolume: number;

	@Column({
		type: DataTypes.STRING(12),
		allowNull: true
	})
	volumeUnit: string;

	@Column({
		type: DataTypes.INTEGER,
		allowNull: true
	})
	bootOrder: number;

	@Column({
		type: DataTypes.STRING(64),
		allowNull: true
	})
	irq: string;
}
