import KeyboardLayout from '@/data_access/models/keyboard/KeyboardLayout';
import OsVersion from '@/data_access/models/os/OsVersion';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'os_version_keyboard_layout_settings'
})
export default class OsVersionKeyboardLayoutSettings extends Model<OsVersionKeyboardLayoutSettings> {
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

	@ForeignKey(() => KeyboardLayout)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	keyboardLayoutID: number;
}
