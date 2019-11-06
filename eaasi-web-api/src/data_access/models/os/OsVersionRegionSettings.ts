import Region from '@/data_access/models/geo/Region';
import OsVersion from '@/data_access/models/os/OsVersion';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'os_version_region_settings'
})
export default class OsVersionRegionSettings extends Model<OsVersionRegionSettings> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@ForeignKey(() => OsVersion)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	osVersionID: number

	@ForeignKey(() => Region)
	@Column({
		type: DataTypes.STRING,
		allowNull: false,
	})
	regionQID: string

	@Column({
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: false
	})
	isDefaultRegion: boolean
}
