import { StorageDeviceType } from '@/data_access/models/legacy/storage/StorageDeviceType';
import { SystemRequirements } from '@/data_access/models/legacy/system/SystemRequirements';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'system_requirements_requires_storage_device'
})
export class SystemRequirementsRequiresStorageDeviceType extends Model<SystemRequirementsRequiresStorageDeviceType> {
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

	@ForeignKey(() => StorageDeviceType)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: true,
	})
	storageDeviceTypeID: number;
}

