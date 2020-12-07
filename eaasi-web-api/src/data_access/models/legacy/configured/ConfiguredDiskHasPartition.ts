import { FileSystem } from '@/data_access/models/legacy/file/FileSystem';
import { SoftwareEnvironment } from '@/data_access/models/legacy/software/SoftwareEnvironment';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'configured_disk_has_partition'
})
export class ConfiguredDiskHasPartition extends Model<ConfiguredDiskHasPartition> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@ForeignKey(() => SoftwareEnvironment)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	softwareEnvironmentID: number;

	@ForeignKey(() => FileSystem)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false
	})
	fileSystemID: number;

	@Column({
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: false
	})
	isStartupDisk: boolean;
}
