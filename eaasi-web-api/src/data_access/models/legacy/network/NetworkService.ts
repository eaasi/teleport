import { CreatedAt, UpdatedAt, Column, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'network_service'
})
export class NetworkService extends Model<NetworkService> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@Column({
		type: DataTypes.INTEGER,
		allowNull: true,
		primaryKey: true,
		autoIncrement: true
	})
	id: number

	@Column({
		type: DataTypes.STRING(64),
		allowNull: true,
	})
	qid: string

	@Column({
		type: DataTypes.STRING(64),
		allowNull: true,
	})
	name: string

	@Column({
		type: DataTypes.STRING(12),
		allowNull: true,
	})
	defaultPort: string

	@Column({
		type: DataTypes.STRING(32),
		allowNull: true,
	})
	defaultPortRange: string
}
