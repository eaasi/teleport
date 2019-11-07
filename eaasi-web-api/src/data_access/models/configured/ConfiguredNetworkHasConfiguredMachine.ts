import ConfiguredMachine from '@/data_access/models/configured/ConfiguredMachine';
import ConfiguredNetwork from '@/data_access/models/configured/ConfiguredNetwork';
import { CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'configured_network_has_configured_machine'
})
export default class ConfiguredNetworkHasConfiguredMachine extends Model<ConfiguredNetworkHasConfiguredMachine> {
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

	@Column({
		type: DataTypes.INTEGER,
		allowNull: true,
	})
	bootOrder: number;

	@Column({
		type: DataTypes.STRING,
		allowNull: true,
	})
	staticIpAddress: number
}
