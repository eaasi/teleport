import { ConfiguredMachine } from '@/data_access/models/legacy/configured/ConfiguredMachine';
import { KeyboardDevice } from '@/data_access/models/legacy/keyboard/KeyboardDevice';
import { MachineInterface } from '@/data_access/models/legacy/machine/MachineInterface';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'configured_keyboard_device'
})
export class ConfiguredKeyboardDevice extends Model<ConfiguredKeyboardDevice> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@ForeignKey(() => ConfiguredMachine)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false
	})
	configuredMachineID: number;

	@ForeignKey(() => KeyboardDevice)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false
	})
	keyboardDeviceID: number;

	@ForeignKey(() => MachineInterface)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false
	})
	uses_machineInterfaceID: number;
}

