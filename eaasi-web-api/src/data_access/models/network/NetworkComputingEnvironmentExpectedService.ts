import ComputingEnvironment from '@/data_access/models/computing/ComputingEnvironment';
import NetworkEnvironment from '@/data_access/models/network/NetworkEnvironment';
import NetworkService from '@/data_access/models/network/NetworkService';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'network_computing_environment_expected_service'
})
export default class NetworkComputingEnvironmentExpectedService extends Model<NetworkComputingEnvironmentExpectedService> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@ForeignKey(() => NetworkEnvironment)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	networkEnvironmentID: number;

	@ForeignKey(() => ComputingEnvironment)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	computingEnvironmentID: number;

	@ForeignKey(() => NetworkService)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	expectedNetworkServiceID: number;

	@Column({
		type: DataTypes.STRING(12),
		allowNull: true,
	})
	expectedServicePort: string
}
