import { CreatedAt, UpdatedAt, Column, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'country'
})
export class Country extends Model<Country> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@Column({
		type: DataTypes.STRING(64),
		primaryKey: true,
		allowNull: false,
	})
	qid: string;

	@Column({
		type: DataTypes.STRING(64),
		allowNull: true
	})
	label: string;

	@Column({
		type: DataTypes.STRING(32),
		allowNull: true
	})
	iso31661_numeric_code: string;
}
