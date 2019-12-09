import { OsVersion } from '@/data_access/models/os/OsVersion';
import { SoftwareLicense } from '@/data_access/models/software/SoftwareLicense';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'os_version_has_software_license'
})
export class OsVersionHasSoftwareLicense extends Model<OsVersionHasSoftwareLicense> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@ForeignKey(() => OsVersion)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	osVersionID: number;

	@ForeignKey(() => SoftwareLicense)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	softwareLicenseID: number;
}
