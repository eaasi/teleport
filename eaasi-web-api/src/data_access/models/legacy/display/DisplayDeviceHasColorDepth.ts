import { ColorDepth } from '@/data_access/models/legacy/base/ColorDepth';
import { DisplayDevice } from '@/data_access/models/legacy/display/DisplayDevice';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'display_device_has_color_depth'
})
export class DisplayDeviceHasColorDepth extends Model<DisplayDeviceHasColorDepth> {
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

	@ForeignKey(() => ColorDepth)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	colorDepthID: number;
}
