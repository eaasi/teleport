import SoftwareProduct from '@/data_access/models/software/SoftwareProduct';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'software_version'
})
export default class SoftwareVersion extends Model<SoftwareVersion> {
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
		type: DataTypes.STRING,
		allowNull: true,
	})
	qid: string;

	@Column({
		type: DataTypes.STRING,
		allowNull: true,
	})
	name: string;

	@Column({
		type: DataTypes.TEXT,
		allowNull: true,
	})
	helpText: string;

	@Column({
		type: DataTypes.STRING,
		allowNull: true,
	})
	versionNumber: string;

	@Column({
		type: DataTypes.DATE,
		allowNull: true,
	})
	publicationDate: Date;

	@ForeignKey(() => SoftwareProduct)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: true,
	})
	isVersionOf_softwareProduct: number;
}
