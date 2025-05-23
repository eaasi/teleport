import { PointerDevice } from '@/data_access/models/legacy/pointer/PointerDevice';
import { SoftwareVersion } from '@/data_access/models/legacy/software/SoftwareVersion';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'pointer_device_has_driver_software'
})
export class PointerDeviceHasDriverSoftware extends Model<PointerDeviceHasDriverSoftware> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@ForeignKey(() => PointerDevice)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	pointerDeviceID: number;

	@ForeignKey(() => SoftwareVersion)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	driverSoftwareID: number;
}
