import { DataTypes } from 'sequelize';
import { BelongsTo, Column, CreatedAt, ForeignKey, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { EaasiUser } from '.';

@Table({
	tableName: 'eaasi_user_hash'
})
export class EaasiUserHash extends Model<EaasiUserHash> {

	@CreatedAt
	readonly createdAt: Date = new Date();

    @UpdatedAt
	updatedAt: Date = new Date();

	@ForeignKey(() => EaasiUser)
    @Column({
    	type: DataTypes.STRING(50),
    	allowNull: false,
    	primaryKey: true
    })
    userId: string;

    @Column({
    	allowNull: false,
    	type: DataTypes.STRING(9999)
    })
	hash: string;

	@BelongsTo(() => EaasiUser, {
		foreignKey: 'userId',
		onDelete: 'CASCADE'
	})
    user: EaasiUser

}
