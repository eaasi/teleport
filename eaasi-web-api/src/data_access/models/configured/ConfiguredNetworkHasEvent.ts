import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import ConfiguredNetwork from '@/data_access/models/configured/ConfiguredNetwork';

@Table({
	tableName: 'configured_network_has_event'
})
export default class ConfiguredNetworkHasEvent extends Model<ConfiguredNetworkHasEvent> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@ForeignKey(() => ConfiguredNetwork)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	configuredNetworkID: number

	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	eventID: number
}
