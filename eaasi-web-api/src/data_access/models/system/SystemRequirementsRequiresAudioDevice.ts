import AudioDevice from '@/data_access/models/audio-device/AudioDevice';
import SystemRequirements from '@/data_access/models/system/SystemRequirements';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'system_requirements_requires_audio_device'
})
export default class SystemRequirementsRequiresAudioDevice extends Model<SystemRequirementsRequiresAudioDevice> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@ForeignKey(() => SystemRequirements)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	systemRequirementsID: number;

	@ForeignKey(() => AudioDevice)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: true,
	})
	audioDeviceID: number;
}
