import ColorDepth from '@/data_access/models/base/colorDepth';
import DisplayResolution from '@/data_access/models/display/displayResolution';
import OsVersion from '@/data_access/models/os/osVersion';
import Region from '@/data_access/models/geo/region';
import SoftwareObject from '@/data_access/models/software/softwareObject';
import Timezone from '@/data_access/models/timezone/timezone';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'configuredOs'
})
export default class ConfiguredOS extends Model<ConfiguredOS> {
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

	@ForeignKey(() => DisplayResolution)
	@Column({
		type: DataTypes.BIGINT,
		allowNull: true,
	})
	displayResolutionId: number

	@ForeignKey(() => ColorDepth)
	@Column({
		type: DataTypes.BIGINT,
		allowNull: true,
	})
	colorDepthId: number

	@ForeignKey(() => Region)
	@Column({
		type: DataTypes.STRING,
		allowNull: true,
	})
	configuredRegionQid: string

	@ForeignKey(() => Timezone)
	@Column({
		type: DataTypes.STRING,
		allowNull: true,
	})
	configuredTimezoneQid: string

	@Column({
		type: DataTypes.DATE,
		allowNull: true,
	})
	configuredDateTime: Date

	@ForeignKey(() => SoftwareObject)
	@Column({
		type: DataTypes.STRING,
		allowNull: true,
	})
	has_source_softwareObjectID: string

	@ForeignKey(() => OsVersion)
	@Column({
		type: DataTypes.BIGINT,
		allowNull: true,
	})
	manifestation_of_osVersionId: number
}
