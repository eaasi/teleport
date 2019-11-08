import {CreatedAt, UpdatedAt, Column, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'network_device_has_driver_software'
})
export default class NetworkDeviceHasDriverSoftware extends Model<NetworkDeviceHasDriverSoftware> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@Column({
		type: DataTypes.INTEGER,
		allowNull: true,
	})
	networkDeviceID: number;

	@Column({
		type: DataTypes.INTEGER,
		allowNull: true,
	})
	driverSoftwareID: number;
}
