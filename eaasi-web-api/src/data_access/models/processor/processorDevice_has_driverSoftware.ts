import ProcessorDevice from '@/data_access/models/processor/processorDevice';
import SoftwareVersion from '@/data_access/models/software/softwareVersion';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'processor_device_has_driver_software'
})
export default class ProcessorDeviceHasDriverSoftware extends Model<ProcessorDeviceHasDriverSoftware> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@ForeignKey(() => ProcessorDevice)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	processorDeviceID: number

	@ForeignKey(() => SoftwareVersion)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	driverSoftwareID: number
}
