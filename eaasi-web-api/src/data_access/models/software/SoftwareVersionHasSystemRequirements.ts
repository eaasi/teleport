import SoftwareVersion from '@/data_access/models/software/softwareVersion';
import SystemRequirements from '@/data_access/models/system/SystemRequirements';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'software_version_has_system_requirements'
})
export default class SoftwareVersionHasSystemRequirements extends Model<SoftwareVersionHasSystemRequirements> {
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

	@ForeignKey(() => SystemRequirements)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: true,
	})
	systemRequirementsID: number;
}
