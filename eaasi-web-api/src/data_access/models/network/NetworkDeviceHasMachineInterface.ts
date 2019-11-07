import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import NetworkDevice from '@/data_access/models/network/NetworkDevice';
import MachineInterface from '@/data_access/models/machine/MachineInterface';

@Table({
	tableName: 'network_device_has_machine_interface'
})
export default class NetworkDeviceHasMachineInterface extends Model<NetworkDeviceHasMachineInterface> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@ForeignKey(() => NetworkDevice)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	networkDeviceID: number;

    @ForeignKey(() => MachineInterface)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	machineInterfaceID: number;
}
