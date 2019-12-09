import {CreatedAt, UpdatedAt, Column, HasOne, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { EaasiRole } from './EaasiRole';

@Table({
	tableName: 'eaasi_user'
})
export class EaasiUser extends Model<EaasiUser> {
    @CreatedAt
	readonly createdAt: Date = new Date();

    @UpdatedAt
    updatedAt: Date = new Date();

    @Column({
    	type: DataTypes.INTEGER,
    	allowNull: false,
    	primaryKey: true,
    	autoIncrement: true,
    })
    id: number;

    @Column({
    	allowNull: false,
    	type: DataTypes.STRING(50)
    })
    username: string;

    @Column({
    	allowNull: true,
    	type: DataTypes.STRING(50)
    })
    firstName: string;

    @Column({
    	allowNull: true,
    	type: DataTypes.STRING(50)
    })
    lastName: string;

    @Column({
    	allowNull: true,
    	type: DataTypes.STRING(128)
    })
    email: string;

    @ForeignKey(() => EaasiRole)
    @Column({
    	type: DataTypes.INTEGER,
    })
    roleId: number;

    @Column({
    	type: DataTypes.TIME,
    	allowNull: true
    })
    lastLogin: Date;

    @HasOne(() => EaasiRole, 'id')
    role: EaasiRole;
}
