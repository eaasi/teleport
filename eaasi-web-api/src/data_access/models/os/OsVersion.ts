import { SystemRequirements } from '@/data_access/models/system/SystemRequirements';
import { CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'os_version'
})
export class OsVersion extends Model<OsVersion> {
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
	id: number;

	@Column({
		type: DataTypes.STRING(64),
		allowNull: true,
	})
	qid: string;

	@Column({
		type: DataTypes.STRING(128),
		allowNull: true,
	})
	name: string;

	@Column({
		type: DataTypes.STRING(256),
		allowNull: true,
	})
	description: string;

	@Column({
		type: DataTypes.STRING(16),
		allowNull: true,
	})
	versionNumber: string;

	@Column({
		type: DataTypes.DATE,
		allowNull: true,
	})
	publicationDate: Date;

	@ForeignKey(() => SystemRequirements)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: true,
	})
	systemRequirementsId: number;

	@Column({
		type: DataTypes.INTEGER,
		allowNull: true,
	})
	isVersionOf_osProduct: number;
}
