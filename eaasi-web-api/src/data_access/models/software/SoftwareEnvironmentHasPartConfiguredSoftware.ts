import SoftwareEnvironment from '@/data_access/models/software/SoftwareEnvironment';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'software_environment_has_part_configured_software'
})
export default class SoftwareEnvironmentHasPartConfiguredSoftware extends Model<SoftwareEnvironmentHasPartConfiguredSoftware> {
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

	@ForeignKey(() => SoftwareEnvironment)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	configuredSoftwareID: number;
}
