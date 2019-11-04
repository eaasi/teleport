import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'formatImplementation'
})
export default class FormatImplementation extends Model<FormatImplementation> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@Column({
		type: DataTypes.INTEGER,
		primaryKey: true,
		allowNull: false,
		autoIncrement: true
	})
	id: number

	@Column({
		type: DataTypes.STRING,
		allowNull: false
	})
	name: string

	@ForeignKey(() => FileExtension)
	@Column({
		type: DataTypes.STRING,
		allowNull: true
	})
	extension: string
}
