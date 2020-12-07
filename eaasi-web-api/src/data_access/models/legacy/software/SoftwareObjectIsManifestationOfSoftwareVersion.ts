import { SoftwareObject } from '@/data_access/models/legacy/software/SoftwareObject';
import { SoftwareVersion } from '@/data_access/models/legacy/software/SoftwareVersion';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'software_object_is_manifestation_of_software_version'
})
export class SoftwareObjectIsManifestationOfSoftwareVersion extends Model<SoftwareObjectIsManifestationOfSoftwareVersion> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@ForeignKey(() => SoftwareObject)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	softwareObjectID: number;

	@ForeignKey(() => SoftwareVersion)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	softwareVersionID: number;
}
