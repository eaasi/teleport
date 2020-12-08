import { SoftwareLicense } from '@/data_access/models/legacy/software/SoftwareLicense';
import { SoftwareVersion } from '@/data_access/models/legacy/software/SoftwareVersion';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'software_version_has_software_license'
})
export class SoftwareVersionHasSoftwareLicense extends Model<SoftwareVersionHasSoftwareLicense> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@ForeignKey(() => SoftwareVersion)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	softwareVersionID: number;

	@ForeignKey(() => SoftwareLicense)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	softwareLicenseID: number;
}
