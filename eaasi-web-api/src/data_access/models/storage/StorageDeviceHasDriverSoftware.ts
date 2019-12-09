import { SoftwareVersion } from '@/data_access/models/software/SoftwareVersion';
import { StorageDevice } from '@/data_access/models/storage/StorageDevice';
import { CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'storage_device_has_driver_software'
})
export class StorageDeviceHasDriverSoftware extends Model<StorageDeviceHasDriverSoftware> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@ForeignKey(() => StorageDevice)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	storageDeviceID: string;

	@ForeignKey(() => SoftwareVersion)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: true
	})
	driverSoftwareID: number;
}
