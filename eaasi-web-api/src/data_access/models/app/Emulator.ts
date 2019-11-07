import { CreatedAt, UpdatedAt, Column, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { IEmulator } from '@/types/admin/Emulator';

@Table({
	tableName: 'emulator'
})
export default class Emulator extends Model<Emulator> implements IEmulator {
    @CreatedAt
	createdAt: Date;

    @UpdatedAt
    updatedAt: Date;

    @Column({
    	type: DataTypes.INTEGER,
    	allowNull: false,
    	primaryKey: true,
    	autoIncrement: true
    })
    readonly id: number;

    @Column({
    	type: DataTypes.STRING(64),
    	allowNull: false,
    	unique: true
    })
    name: string
}
