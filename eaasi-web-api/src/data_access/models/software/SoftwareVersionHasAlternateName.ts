import SoftwareVersion from '@/data_access/models/software/softwareVersion';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'software_version_has_alternate_name'
})
export default class SoftwareVersionHasAlternateName extends Model<SoftwareVersionHasAlternateName> {
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

	@Column({
		type: DataTypes.STRING(128),
		allowNull: true,
	})
	alternateName: string;
}
