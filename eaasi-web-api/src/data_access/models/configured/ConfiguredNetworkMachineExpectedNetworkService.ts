import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import ConfiguredNetwork from '@/data_access/models/configured/ConfiguredNetwork';
import NetworkService from '@/data_access/models/network/NetworkService';
import ConfiguredMachine from '@/data_access/models/configured/ConfiguredMachine';

@Table({
	tableName: 'configured_network_machine_expected_network_service'
})
export default class ConfiguredNetworkMachineExpectedNetworkService extends Model<ConfiguredNetworkMachineExpectedNetworkService> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@ForeignKey(() => ConfiguredNetwork)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	configuredNetworkID: number;

	@ForeignKey(() => ConfiguredMachine)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	configuredMachineID: number;

	@ForeignKey(() => NetworkService)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	expectedNetworkServiceID: number;

	@Column({
		type: DataTypes.STRING,
		allowNull: true,
	})
	servicePortExpected: string;
}
