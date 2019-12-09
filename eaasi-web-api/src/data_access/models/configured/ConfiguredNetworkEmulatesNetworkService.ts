import { ConfiguredNetwork } from '@/data_access/models/configured/ConfiguredNetwork';
import { NetworkService } from '@/data_access/models/network/NetworkService';
import { CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'configured_network_emulates_network_service'
})
export class ConfiguredNetworkEmulatesNetworkService extends Model<ConfiguredNetworkEmulatesNetworkService> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@ForeignKey(() => ConfiguredNetwork)
	@Column({
		type: DataTypes.STRING,
		allowNull: true,
	})
	configuredNetworkID: number

	@ForeignKey(() => NetworkService)
	@Column({
		type: DataTypes.STRING,
		allowNull: true,
	})
	networkServiceID: number
}
