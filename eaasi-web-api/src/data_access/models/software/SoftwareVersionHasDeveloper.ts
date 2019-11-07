import Developer from '@/data_access/models/base/Developer';
import SoftwareVersion from '@/data_access/models/software/softwareVersion';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'software_version_has_developer'
})
export default class SoftwareVersionHasDeveloper extends Model<SoftwareVersionHasDeveloper> {
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

	@ForeignKey(() => Developer)
	@Column({
		type: DataTypes.STRING(64),
		allowNull: true,
	})
	developerQid: string;
}

