import { ProcessorDevice } from '@/data_access/models/legacy/processor/ProcessorDevice';
import { SystemRequirements } from '@/data_access/models/legacy/system/SystemRequirements';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'system_requirements_requires_processor_device'
})
export class SystemRequirementsRequiresProcessor extends Model<SystemRequirementsRequiresProcessor> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@ForeignKey(() => SystemRequirements)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	systemRequirementsID: number;

	@ForeignKey(() => ProcessorDevice)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: true,
	})
	processorDeviceID: number;

	@Column({
		type: DataTypes.INTEGER,
		allowNull: true,
	})
	minimumFrequency: number;

	@Column({
		type: DataTypes.STRING(12),
		allowNull: true,
	})
	minimumFrequencyUnit: string;
}
