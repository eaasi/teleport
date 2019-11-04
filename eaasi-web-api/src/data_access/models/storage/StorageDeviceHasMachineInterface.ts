import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'storage_device_has_machine_interface'
})
export default class StorageDeviceTypeHasMachineInterface extends Model<StorageDeviceTypeHasMachineInterface> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@Column({
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	})
	id: number

	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	storageDeviceID: number

	@Column({
		type: DataTypes.INTEGER,
		allowNull: true
	})
	machineInterfaceID: number
}
