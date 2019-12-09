import { ColorDepth } from '@/data_access/models/base/ColorDepth';
import { DisplayResolution } from '@/data_access/models/display/DisplayResolution';
import { OsVersion } from '@/data_access/models/os/OsVersion';
import { Region } from '@/data_access/models/geo/Region';
import { SoftwareObject } from '@/data_access/models/software/SoftwareObject';
import { Timezone } from '@/data_access/models/timezone/Timezone';
import { CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'configured_os'
})
export class ConfiguredOS extends Model<ConfiguredOS> {
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
	id: number

	@ForeignKey(() => DisplayResolution)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: true,
	})
	displayResolutionID: number

	@ForeignKey(() => ColorDepth)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: true,
	})
	colorDepthID: number

	@ForeignKey(() => Region)
	@Column({
		type: DataTypes.STRING,
		allowNull: true,
	})
	regionQid: string

	@ForeignKey(() => Timezone)
	@Column({
		type: DataTypes.STRING,
		allowNull: true,
	})
	timezoneQid: string

	@Column({
		type: DataTypes.DATE,
		allowNull: true,
	})
	configuredDateTime: Date

	@ForeignKey(() => SoftwareObject)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: true,
	})
	hasSource_softwareObjectID: number

	@ForeignKey(() => OsVersion)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: true,
	})
	manifestationOf_osVersionID: number
}
