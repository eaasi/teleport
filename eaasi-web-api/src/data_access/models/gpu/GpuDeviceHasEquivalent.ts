import GpuDevice from '@/data_access/models/gpu/GpuDevice';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'gpu_device_has_equivalent'
})
export default class GpuDeviceHasEquivalent extends Model<GpuDeviceHasEquivalent> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@ForeignKey(() => GpuDevice)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	gpuDeviceID: number

	@ForeignKey(() => GpuDevice)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: true
	})
	equivalentGpuDeviceID: number
}
