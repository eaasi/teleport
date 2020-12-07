import { ConfiguredNetwork } from '@/data_access/models/legacy/configured/ConfiguredNetwork';
import { SoftwareEnvironment } from '@/data_access/models/legacy/software/SoftwareEnvironment';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'computing_environment'
})
export class ComputingEnvironment extends Model<ComputingEnvironment> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true
	})
	id: number;

	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	sourceOrg: number;

	@Column({
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: false
	})
	isInNetwork: boolean;

    @ForeignKey(() => ConfiguredNetwork)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: true,
	})
	configuredNetworkID: number;

	@ForeignKey(() => SoftwareEnvironment)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: true,
	})
    softwareEnvironmentID: number;
}
