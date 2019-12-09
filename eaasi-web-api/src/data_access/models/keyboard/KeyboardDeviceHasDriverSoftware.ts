import { KeyboardDevice } from '@/data_access/models/keyboard/KeyboardDevice';
import { SoftwareVersion } from '@/data_access/models/software/SoftwareVersion';
import { CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'keyboard_device_has_driver_software'
})
export class KeyboardDeviceHasDriverSoftware extends Model<KeyboardDeviceHasDriverSoftware> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@ForeignKey(() => KeyboardDevice)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	keyboardDeviceID: number;

	@ForeignKey(() => SoftwareVersion)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: true
	})
	driverSoftwareID: number;
}
