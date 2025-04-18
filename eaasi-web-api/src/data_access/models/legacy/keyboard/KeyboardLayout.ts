import { Language } from '@/data_access/models/legacy/base/Language';
import { CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'keyboard_layout'
})
export class KeyboardLayout extends Model<KeyboardLayout> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@ForeignKey(() => Language)
	@Column({
		type: DataTypes.STRING(64),
		primaryKey: true,
		allowNull: true
	})
	qid: string;

	@Column({
		type: DataTypes.STRING(64),
		allowNull: true
	})
	label: string
}
