import RecommendationLevel from '@/data_access/models/base/RecommendationLevel';
import SoftwareVersion from '@/data_access/models/software/softwareVersion';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'machine_recommendation'
})
export default class MachineRecommendation extends Model<MachineRecommendation> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@Column({
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	})
	id: number

	@ForeignKey(() => SoftwareVersion)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: true
	})
	softwareVersionID: number

	@ForeignKey(() => EmulatorProject)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: true
	})
	emulatorProject: number

	@ForeignKey(() => RecommendedMachine)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: true
	})
	recommendedMachineID: number

	@ForeignKey(() => RecommendationLevel)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: true
	})
	recommendationLevel: number

	@Column({
		type: DataTypes.STRING,
		allowNull: true
	})
	description : string
}
