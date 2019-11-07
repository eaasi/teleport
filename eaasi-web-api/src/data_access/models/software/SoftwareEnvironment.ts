import ConfiguredOS from '@/data_access/models/configured/ConfiguredOS';
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
		type: DataTypes.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true
	})
	id: number;

	@Column({
		type: DataTypes.STRING(128),
		allowNull: false,
	})
	name: string;

	@Column({
		type: DataTypes.STRING(512),
		allowNull: true,
	})
	description: string;

	@Column({
		type: DataTypes.TEXT,
		allowNull: true,
	})
	helpText: string;

	@ForeignKey(() => SoftwareEnvironment)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: true,
	})
	derivedFrom_SoftwareEnvironmentID: number;

	@ForeignKey(() => ConfiguredOS)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: true,
	})
	hasPart_configuredOsID: number;
}
