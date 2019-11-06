import ColorDepth from '@/data_access/models/base/ColorDepth';
import OsVersion from '@/data_access/models/os/OsVersion';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'os_version_color_depth_settings'
})
export default class OsVersionColorDepthSettings extends Model<OsVersionColorDepthSettings> {
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

	@ForeignKey(() => ColorDepth)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	colorDepthID: number
}
