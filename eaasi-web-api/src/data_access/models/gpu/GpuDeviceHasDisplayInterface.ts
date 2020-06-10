import { DisplayInterface } from '@/data_access/models/display/DisplayInterface';
import { GpuDevice } from '@/data_access/models/gpu/GpuDevice';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'gpu_device_has_display_interface'
})
export class GpuDeviceHasDisplayInterface extends Model<GpuDeviceHasDisplayInterface> {
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

	@ForeignKey(() => DisplayInterface)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: true
	})
	displayInterfaceID: number;
}
