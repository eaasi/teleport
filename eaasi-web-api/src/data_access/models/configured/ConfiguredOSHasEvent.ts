import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import ConfiguredOS from '@/data_access/models/configured/ConfiguredOS';

@Table({
	tableName: 'configured_os_has_event'
})
export default class ConfiguredOSHasEvent extends Model<ConfiguredOSHasEvent> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@ForeignKey(() => ConfiguredOS)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	configuredOsID: number

	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	eventID: number
}

