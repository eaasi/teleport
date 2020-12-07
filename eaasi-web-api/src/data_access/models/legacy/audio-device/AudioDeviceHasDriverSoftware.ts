import { AudioDevice } from '@/data_access/models/legacy/audio-device/AudioDevice';
import { SoftwareVersion } from '@/data_access/models/legacy/software/SoftwareVersion';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'audio_device_has_driver_software'
})
export class AudioDeviceHasDriverSoftware extends Model<AudioDeviceHasDriverSoftware> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@ForeignKey(() => AudioDevice)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	audioDeviceID: number;

	@ForeignKey(() => SoftwareVersion)
	@Column({
		type: DataTypes.STRING,
		allowNull: false,
	})
	driverSoftwareID: string;
}
