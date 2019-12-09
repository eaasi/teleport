import { FileSystem } from '@/data_access/models/file/FileSystem';
import { SoftwareEnvironment } from '@/data_access/models/software/SoftwareEnvironment';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'software_environment_has_disk_image'
})
export class SoftwareEnvironmentHasDiskImage extends Model<SoftwareEnvironmentHasDiskImage> {
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

	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	diskImageID: number;

	@Column({
		type: DataTypes.STRING(32),
		allowNull: true,
	})
	mountPoint: string;

	@ForeignKey(() => FileSystem)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: true,
	})
	fileSystemID: number;

	@Column({
		type: DataTypes.INTEGER,
		allowNull: true,
	})
	storageCapacityBytes: number;

	@Column({
		type: DataTypes.INTEGER,
		allowNull: true,
	})
	storageUsedBytes: number;

	@Column({
		type: DataTypes.INTEGER,
		allowNull: true,
	})
	storageRemainingBytes: number;
}
