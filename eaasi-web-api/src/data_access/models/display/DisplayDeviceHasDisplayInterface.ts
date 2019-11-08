import DisplayDevice from '@/data_access/models/display/DisplayDevice';
import DisplayInterface from '@/data_access/models/display/DisplayInterface';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'display_device_has_display_interface'
})
export default class DisplayDeviceHasDisplayInterface extends Model<DisplayDeviceHasDisplayInterface> {
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

	@ForeignKey(() => DisplayInterface)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	displayInterfaceID: number;
}
