import Language from '@/data_access/models/base/Language';
import ConfiguredMachine from '@/data_access/models/configured/ConfiguredMachine';
import { CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'keyboard_device'
})
export default class KeyboardDevice extends Model<KeyboardDevice> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@ForeignKey(() => ConfiguredMachine)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true
	})
	id: number

	@Column({
		type: DataTypes.STRING,
		allowNull: true
	})
	qid: number

	@Column({
		type: DataTypes.STRING,
		allowNull: true
	})
	name: number

	@Column({
		type: DataTypes.STRING,
		allowNull: true
	})
	layout: number

	@ForeignKey(() => Language)
	@Column({
		type: DataTypes.STRING,
		allowNull: true
	})
	languageQID: number
}

