import { DisplayResolution } from '@/data_access/models/legacy/display/DisplayResolution';
import { OsVersion } from '@/data_access/models/legacy/os/OsVersion';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'os_version_display_resolution_settings'
})
export class OsVersionDisplayResolutionSettings extends Model<OsVersionDisplayResolutionSettings> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@ForeignKey(() => OsVersion)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	osVersionID: number;

	@ForeignKey(() => DisplayResolution)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	displayResolutionID: number;
}

