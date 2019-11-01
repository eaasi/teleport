import { CreatedAt, UpdatedAt, Column, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'bookmark'
})
export default class Bookmark extends Model<Bookmark> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@Column({
		type: DataTypes.BIGINT,
		allowNull: false,
		primaryKey: true
	})
	id: number

	@Column({
		type: DataTypes.BIGINT,
		allowNull: false,
		references: {
			model: 'eaasi_user',
			key: 'id'
		}
	})
	userId: number

	@Column({
		type: DataTypes.STRING,
		allowNull: false,
	})
	resourceId: string
}
