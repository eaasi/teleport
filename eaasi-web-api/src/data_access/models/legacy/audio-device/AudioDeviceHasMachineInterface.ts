import { AudioDevice } from '@/data_access/models/legacy/audio-device/AudioDevice';
import { MachineInterface } from '@/data_access/models/legacy/machine/MachineInterface';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'audio_device_has_machine_interface'
})
export class AudioDeviceHasMachineInterface extends Model<AudioDeviceHasMachineInterface> {
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

	@ForeignKey(() => MachineInterface)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: true
	})
	machineInterfaceID: number;
}
