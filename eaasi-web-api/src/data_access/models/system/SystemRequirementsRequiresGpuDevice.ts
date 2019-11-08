import GpuDevice from '@/data_access/models/gpu/GpuDevice';
import SystemRequirements from '@/data_access/models/system/SystemRequirements';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'system_requirements_requires_gpu_device'
})
export default class SystemRequirementsRequiresGpuDevice extends Model<SystemRequirementsRequiresGpuDevice> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@ForeignKey(() => SystemRequirements)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	systemRequirementsID: number;

	@ForeignKey(() => GpuDevice)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: true,
	})
	gpuDeviceID: number
}
