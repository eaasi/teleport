import { DisplayDevice } from '@/data_access/models/display/DisplayDevice';
import { SoftwareVersion } from '@/data_access/models/software/SoftwareVersion';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'display_device_has_driver_software'
})
export class DisplayDeviceHasDriverSoftware extends Model<DisplayDeviceHasDriverSoftware> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@ForeignKey(() => DisplayDevice)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	displayDeviceID: number;

	@ForeignKey(() => SoftwareVersion)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	driverSoftwareID: number;
}
