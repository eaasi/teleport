import ColorDepth from '@/data_access/models/base/ColorDepth';
import DisplayResolution from '@/data_access/models/display/DisplayResolution';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'system_requirements'
})
export default class SystemRequirements extends Model<SystemRequirements> {
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
		type: DataTypes.TEXT,
		allowNull: true,
	})
	requirementsSummary: string

	@Column({
		type: DataTypes.INTEGER,
		allowNull: true,
	})
	minimumRAM: number

	@Column({
		type: DataTypes.STRING,
		allowNull: true,
	})
	minimumRAMUnitName: string

	@Column({
		type: DataTypes.INTEGER,
		allowNull: true,
	})
	minimumDiskVolume: number

	@Column({
		type: DataTypes.STRING,
		allowNull: true,
	})
	minimumDiskVolumeUnitName: string

	@ForeignKey(() => ColorDepth)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: true,
	})
	colorDepthID: number

	@ForeignKey(() => DisplayResolution)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: true,
	})
	displayResolution: number

	@Column({
		type: DataTypes.BOOLEAN,
		allowNull: true,
	})
	isInternetAccessRequired: boolean


	@Column({
		type: DataTypes.INTEGER,
		allowNull: true,
	})
	minimumNetworkBitRate: number

	@Column({
		type: DataTypes.STRING,
		allowNull: true,
	})
	minimumNetworkBitRateUnitName: string
}
