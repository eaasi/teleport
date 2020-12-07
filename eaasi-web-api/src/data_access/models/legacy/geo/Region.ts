import { CreatedAt, UpdatedAt, Column, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'region'
})
export class Region extends Model<Region> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@Column({
		type: DataTypes.STRING(64),
		allowNull: false,
		primaryKey: true,
	})
	qid: string;

	@Column({
		type: DataTypes.STRING(64),
		allowNull: false,
	})
	name: string;

	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	iso31661_numeric_code: number;
}
