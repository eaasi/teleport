import { GpuDevice } from '@/data_access/models/legacy/gpu/GpuDevice';
import { SoftwareVersion } from '@/data_access/models/legacy/software/SoftwareVersion';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'gpu_device_has_driver_software'
})
export class GpuDeviceHasDriverSoftware extends Model<GpuDeviceHasDriverSoftware> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@ForeignKey(() => GpuDevice)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	gpuDeviceID: number;

	@ForeignKey(() => SoftwareVersion)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false
	})
	driverSoftwareID: number;
}
