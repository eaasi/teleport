import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'os_version'
})
export default class OsVersion extends Model<OsVersion> {
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
		allowNull: true,
	})
	qid: string

	@Column({
		type: DataTypes.STRING,
		allowNull: true,
	})
	name: string

	@Column({
		type: DataTypes.STRING,
		allowNull: true,
	})
	description: string

	@Column({
		type: DataTypes.STRING,
		allowNull: true,
	})
	versionNumber: string

	@Column({
		type: DataTypes.DATE,
		allowNull: true,
	})
	publicationDate: Date

	@Column({
		type: DataTypes.INTEGER,
		allowNull: true,
	})
	systemRequirementsId: number

	@Column({
		type: DataTypes.INTEGER,
		allowNull: true,
	})
	isVersionOf_osProduct: number
}
