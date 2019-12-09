import { ComputingEnvironment } from '@/data_access/models/computing/ComputingEnvironment';
import { SoftwareVersion } from '@/data_access/models/software/SoftwareVersion';
import { CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'software_version_compatible_with_computing_environment'
})
export class SoftwareVersionIsCompatibleWithComputingEnvironment extends Model<SoftwareVersionIsCompatibleWithComputingEnvironment> {
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

	@ForeignKey(() => ComputingEnvironment)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	computingEnvironmentID: number;
}

