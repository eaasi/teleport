import ComputingEnvironment from '@/data_access/models/computing/ComputingEnvironment';
import NetworkEnvironment from '@/data_access/models/network/NetworkEnvironment';
import NetworkService from '@/data_access/models/network/NetworkService';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'network_computing_environment_expected_service'
})
export default class MachineType extends Model<MachineType> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@ForeignKey(() => NetworkEnvironment)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	networkEnvironmentID: number

	@ForeignKey(() => ComputingEnvironment)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	computingEnvironmentID: string

	@ForeignKey(() => NetworkService)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	expectedNetworkServiceID: string

	@Column({
		type: DataTypes.STRING,
		allowNull: false,
	})
	expectedServicePort: string
}
