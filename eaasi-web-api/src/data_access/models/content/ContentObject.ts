import { CreatedAt, UpdatedAt, Column, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'content_object'
})
export default class ContentObject extends Model<ContentObject> {
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
	localID: number;

	@Column({
		type: DataTypes.STRING(64),
		allowNull: true
	})
	idSource: string;

	@Column({
		type: DataTypes.STRING(64),
		allowNull: false
	})
	name: string;

	@Column({
		type: DataTypes.STRING(128),
		allowNull: false
	})
	productKey: string;

	@Column({
		type: DataTypes.TEXT,
		allowNull: false
	})
	helpText: string;
}
