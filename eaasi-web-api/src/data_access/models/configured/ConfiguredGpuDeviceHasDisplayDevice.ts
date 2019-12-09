import { ConfiguredGpuDevice } from '@/data_access/models/configured/ConfiguredGpuDevice';
import { DisplayDevice } from '@/data_access/models/display/DisplayDevice';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'configured_gpu_device_has_display_device'
})
export class ConfiguredGpuDeviceHasDisplayDevice extends Model<ConfiguredGpuDeviceHasDisplayDevice> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@ForeignKey(() => ConfiguredGpuDevice)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false
	})
	configuredGpuDeviceID: number;

	@ForeignKey(() => DisplayDevice)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false
	})
	displayDeviceID: number
}
