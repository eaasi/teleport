import { CreatedAt, UpdatedAt, Column, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'audio_device'
})
export default class AudioDeviceHasDriverSoftware extends Model<AudioDeviceHasDriverSoftware> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: 'AudioDevice',
			key: 'id'
		}
	})
	audioDeviceId: number

	@Column({
		type: DataTypes.STRING,
		allowNull: false,
		references: {
			model: 'SoftwareVersion',
			key: 'id'
		}
	})
	driverSoftwareId: string
}

AudioDeviceHasDriverSoftware.associate = models => {
	models.AudioDeviceHasDriverSoftware.hasOne(models.AudioDevice, {foreignKey: 'audioDeviceID'});
	models.AudioDeviceHasDriverSoftware.hasOne(models.SoftwareVersion, {foreignKey: 'softwareVersionID'});
};

