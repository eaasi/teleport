import SoftwareVersion from '@/data_access/models/software/softwareVersion';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'software_version_has_alternate_id'
})
export default class SoftwareProductHasSoftwareType extends Model<SoftwareProductHasSoftwareType> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@ForeignKey(() => SoftwareVersion)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	softwareVersionID: number

	@ForeignKey(() => SoftwareVersion)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	softwareVersionAlternateID: number

	@Column({
		type: DataTypes.STRING,
		allowNull: true,
	})
	softwareVersionIDSource: string

	@Column({
		type: DataTypes.BOOLEAN,
		allowNull: true,
	})
	isLocalID: boolean
}
