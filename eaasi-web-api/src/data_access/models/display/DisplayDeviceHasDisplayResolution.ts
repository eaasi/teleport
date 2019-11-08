import DisplayDevice from '@/data_access/models/display/DisplayDevice';
import DisplayResolution from '@/data_access/models/display/DisplayResolution';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'display_device_has_display_resolution'
})
export default class DisplayDeviceHasDisplayResolution extends Model<DisplayDeviceHasDisplayResolution> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@ForeignKey(() => DisplayDevice)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	displayDeviceID: number;

	@ForeignKey(() => DisplayResolution)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	displayResolutionID: number;
}
