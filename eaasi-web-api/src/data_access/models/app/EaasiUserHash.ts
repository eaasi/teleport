import { DataTypes } from 'sequelize';
import { Column, CreatedAt, ForeignKey, Model, Table, UpdatedAt, BelongsTo } from 'sequelize-typescript';
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
    	type: DataTypes.INTEGER,
    	allowNull: false,
    	primaryKey: true
    })
    userId: number;

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
