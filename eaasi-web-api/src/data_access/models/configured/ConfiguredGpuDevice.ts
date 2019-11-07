import ConfiguredMachine from '@/data_access/models/configured/ConfiguredMachine';
import GpuDevice from '@/data_access/models/gpu/GpuDevice';
import MachineInterface from '@/data_access/models/machine/MachineInterface';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'configured_gpu_device'
})
export default class ConfiguredGpuDevice extends Model<ConfiguredGpuDevice> {
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

	@ForeignKey(() => ConfiguredMachine)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false
	})
	configuredMachineID: number;

	@ForeignKey(() => GpuDevice)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false
	})
	gpuDeviceID: number;

	@Column({
		type: DataTypes.INTEGER,
		allowNull: true
	})
	memoryBytes: number;

	@Column({
		type: DataTypes.STRING(64),
		allowNull: true
	})
	irq: string;

	@ForeignKey(() => MachineInterface)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: true
	})
	uses_machineInterfaceID: number;
}
