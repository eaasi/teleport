import { Language } from '@/data_access/models/base/Language';
import { KeyboardDevice } from '@/data_access/models/keyboard/KeyboardDevice';
import { CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'keyboard_device_has_language'
})
export class KeyboardDeviceHasLanguage extends Model<KeyboardDeviceHasLanguage> {
	@CreatedAt
	readonly createdAt: Date = new Date();

	@UpdatedAt
	readonly updatedAt: Date = new Date();

	@ForeignKey(() => KeyboardDevice)
	@Column({
		type: DataTypes.INTEGER,
		allowNull: false,
	})
	keyboardDeviceID: number

	@ForeignKey(() => Language)
	@Column({
		type: DataTypes.STRING,
		allowNull: true
	})
	languageQID: string
}
