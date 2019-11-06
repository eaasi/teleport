import OsVersion from '@/data_access/models/os/OsVersion';
import Timezone from '@/data_access/models/timezone/Timezone';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'os_version_has_timezone_settings'
})
export default class OsVersionHasTimeZoneSettings extends Model<OsVersionHasTimeZoneSettings> {
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

	@ForeignKey(() => Timezone)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	timezoneID: number
}
