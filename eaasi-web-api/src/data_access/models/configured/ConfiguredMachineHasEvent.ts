import ConfiguredMachine from '@/data_access/models/configured/ConfiguredMachine';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'configured_machine_has_event'
})
export default class ConfiguredMachineHasEvent extends Model<ConfiguredMachineHasEvent> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@ForeignKey(() => ConfiguredMachine)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	configuredMachineID: number

	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	eventID: string
}
