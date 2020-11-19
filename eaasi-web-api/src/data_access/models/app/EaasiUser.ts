import { DataTypes } from 'sequelize';
import { Column, CreatedAt, ForeignKey, BelongsTo, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { EaasiRole } from './EaasiRole';
import { EaasiRoles } from '@/types/auth/User';

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
    	allowNull: true,
    	type: DataTypes.INTEGER,
    })
    roleId: EaasiRoles;

    @Column({
    	type: DataTypes.TIME,
    	allowNull: true
    })
    lastLogin: Date;

	@BelongsTo(() => EaasiRole, {
		foreignKey: 'roleId',
		onUpdate: 'CASCADE',
		onDelete: 'SET NULL'
	})
    role: EaasiRole;
}
