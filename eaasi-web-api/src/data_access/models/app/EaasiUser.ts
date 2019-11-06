import {CreatedAt, UpdatedAt, Column, HasOne, Model, Table, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import EaasiRole from './EaasiRole';

@Table({
	tableName: 'eaasi_user'
})
export default class EaasiUser extends Model<EaasiUser> {
    @CreatedAt
	createdAt: Date;

    @UpdatedAt
    updatedAt: Date;

    @Column({
    	type: DataTypes.INTEGER,
    	allowNull: false,
    	primaryKey: true,
    	autoIncrement: true,
    })
    id: number

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
    	type: DataTypes.STRING(200)
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
