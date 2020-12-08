import { ConfiguredMachine } from '@/data_access/models/legacy/configured/ConfiguredMachine';
import { MachineInterface } from '@/data_access/models/legacy/machine/MachineInterface';
import { NetworkDevice } from '@/data_access/models/legacy/network/NetworkDevice';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'configured_network_device'
})
export class ConfiguredNetworkDevice extends Model<ConfiguredNetworkDevice> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@Column({
		type: DataTypes.STRING,
		allowNull: true,
	})
	macAddress: number;

	@ForeignKey(() => ConfiguredMachine)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	configuredMachineID: number;

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
	uses_machineInterfaceID: number;
}
