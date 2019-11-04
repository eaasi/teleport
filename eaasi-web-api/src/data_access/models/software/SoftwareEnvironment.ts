import ConfiguredOS from '@/data_access/models/configured/configuredOS';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'software_environment'
})
export default class SoftwareEnvironment extends Model<SoftwareEnvironment> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@Column({
		type: DataTypes.BIGINT,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true
	})
	id: number

	@Column({
		type: DataTypes.STRING,
		allowNull: false,
	})
	name: string

	@Column({
		type: DataTypes.STRING,
		allowNull: false,
	})
	description: string

	@Column({
		type: DataTypes.TEXT,
		allowNull: false,
	})
	helpText: string

	@ForeignKey(() => SoftwareEnvironment)
	@Column({
		type: DataTypes.BIGINT,
		allowNull: true,
	})
	derivedFrom_SoftwareEnvironment: number

	@ForeignKey(() => ConfiguredOS)
	@Column({
		type: DataTypes.BIGINT,
		allowNull: true,
	})
	hasPart_configuredOS: number
}
