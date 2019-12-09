import { ChipSet } from '@/data_access/models/base/ChipSet';
import { MachineType } from '@/data_access/models/machine/MachineType';
import { ProcessorDevice } from '@/data_access/models/processor/ProcessorDevice';
import { SoftwareVersion } from '@/data_access/models/software/SoftwareVersion';
import { CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'configured_machine'
})
export class ConfiguredMachine extends Model<ConfiguredMachine> {
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
	id: number

	@Column({
		type: DataTypes.STRING,
		allowNull: false,
	})
	name: string

	@Column({
		type: DataTypes.STRING,
		allowNull: false,
	})
	description: string

	@Column({
		type: DataTypes.DATE,
		allowNull: true,
	})
	datetime: Date

    @ForeignKey(() => MachineType)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: true,
	})
	machineTypeID: Date

	@Column({
		type: DataTypes.INTEGER,
		allowNull: true,
	})
    ram: number

	@Column({
		type: DataTypes.STRING,
		allowNull: true,
	})
	ramUnit: string

	@Column({
		type: DataTypes.INTEGER,
		allowNull: true,
	})
	cpuCores: number

    @ForeignKey(() => SoftwareVersion)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: true,
	})
	emulatorSoftwareID: number

	@ForeignKey(() => ProcessorDevice)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: true,
	})
    processorDeviceID: number

	@ForeignKey(() => ChipSet)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: true,
	})
	chipsetID: number

	@Column({
		type: DataTypes.INTEGER,
		allowNull: true,
	})
	romFileID: number
}
