import { MachineInterface } from '@/data_access/models/legacy/machine/MachineInterface';
import { StorageDevice } from '@/data_access/models/legacy/storage/StorageDevice';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'storage_device_has_machine_interface'
})
export class StorageDeviceHasMachineInterface extends Model<StorageDeviceHasMachineInterface> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@ForeignKey(() => StorageDevice)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	storageDeviceID: number;

	@ForeignKey(() => MachineInterface)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false
	})
	machineInterfaceID: number;
}
