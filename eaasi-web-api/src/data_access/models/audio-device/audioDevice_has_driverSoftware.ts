import AudioDevice from '@/data_access/models/audio-device/AudioDevice';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'audio_device'
})
export default class AudioDeviceHasDriverSoftware extends Model<AudioDeviceHasDriverSoftware> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@ForeignKey(() => AudioDevice)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	audioDeviceId: number

	@ForeignKey(() => SoftwareVersion)
	@Column({
		type: DataTypes.STRING,
		allowNull: false,
	})
	driverSoftwareId: string
}
