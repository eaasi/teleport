import { DataTypes } from 'sequelize';
import { Column, CreatedAt, Model, Table, UpdatedAt } from 'sequelize-typescript';
import {IApplicationLog} from '@/types/general/log';


@Table({
	tableName: 'application_log'
	})
export class ApplicationLog extends Model<IApplicationLog> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	updatedAt: Date = new Date();

	@Column({
		type: DataTypes.STRING(16),
		allowNull: false
		})
	level: string;

	@Column({
		type: DataTypes.JSONB,
		allowNull: true
		})
	message: string;
}