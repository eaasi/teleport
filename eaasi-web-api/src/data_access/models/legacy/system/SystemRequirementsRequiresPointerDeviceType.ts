import { PointerDeviceType } from '@/data_access/models/legacy/pointer/PointerDeviceType';
import { SystemRequirements } from '@/data_access/models/legacy/system/SystemRequirements';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'system_requirements_requires_pointer_device_type'
})
export class SystemRequirementsRequiresPointerDeviceType extends Model<SystemRequirementsRequiresPointerDeviceType> {
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

	@ForeignKey(() => PointerDeviceType)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: true,
	})
	pointerDeviceTypeID: number;
}
