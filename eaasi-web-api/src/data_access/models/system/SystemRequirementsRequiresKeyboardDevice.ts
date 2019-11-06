import KeyboardDevice from '@/data_access/models/keyboard/KeyboardDevice';
import SystemRequirements from '@/data_access/models/system/SystemRequirements';
import {CreatedAt, UpdatedAt, Column, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
	tableName: 'system_requirements_requires_keyboard_device'
})
export default class SystemRequirementsRequiresKeyboardDevice extends Model<SystemRequirementsRequiresKeyboardDevice> {
    @CreatedAt
	readonly createdAt: Date = new Date();

    @UpdatedAt
    readonly updatedAt: Date = new Date();

    @ForeignKey(() => SystemRequirements)
    @Column({
    	type: DataTypes.INTEGER,
    	allowNull: false,
    })
    systemRequirementsID: number

    @ForeignKey(() => KeyboardDevice)
    @Column({
    	type: DataTypes.INTEGER,
    	allowNull: true,
    })
    keyboardDeviceID: number
}
