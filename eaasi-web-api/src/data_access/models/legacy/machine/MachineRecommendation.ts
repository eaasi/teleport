import { RecommendationLevel } from '@/data_access/models/legacy/base/RecommendationLevel';
import { SoftwareVersion } from '@/data_access/models/legacy/software/SoftwareVersion';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'machine_recommendation'
})
export class MachineRecommendation extends Model<MachineRecommendation> {
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
	id: number;

	@ForeignKey(() => SoftwareVersion)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: true
	})
	softwareVersionID: number

	@Column({
		type: DataTypes.INTEGER,
		allowNull: true
	})
	emulatorProjectID: number;

	@Column({
		type: DataTypes.INTEGER,
		allowNull: true
	})
	recommendedMachineID: number;

	@ForeignKey(() => RecommendationLevel)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: true
	})
	recommendationLevelID: number;

	@Column({
		type: DataTypes.STRING(256),
		allowNull: true
	})
	description: string;
}
