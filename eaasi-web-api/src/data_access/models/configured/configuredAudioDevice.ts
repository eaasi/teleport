import AudioDevice from '@/data_access/models/audio-device/AudioDevice';
import ConfiguredMachine from '@/data_access/models/configured/configuredMachine';
import MachineInterface from '@/data_access/models/machine/MachineInterface';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'configured_audio_device'
})
export default class ConfiguredAudioDevice extends Model<ConfiguredAudioDevice> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@ForeignKey(() => AudioDevice)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	audioDeviceID: number

	@ForeignKey(() => ConfiguredMachine)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	configuredMachineID: number

	@Column({
		type: DataTypes.STRING,
		allowNull: true
	})
	irq: string

	@ForeignKey(() => MachineInterface)
	@Column({
		type: DataTypes.STRING,
		allowNull: true
	})
	uses_machineInterfaceID: string
}
