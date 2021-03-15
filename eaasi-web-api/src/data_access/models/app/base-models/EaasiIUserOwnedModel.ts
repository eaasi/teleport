import { BelongsTo, Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { EaasiUser } from '../EaasiUser';

@Table({
	tableName: 'emulation_project'
})
export class EaasiUserOwnedModel extends Model<EaasiUserOwnedModel> {
	@ForeignKey(() => EaasiUser)
	@Column({
    	type: DataTypes.STRING(50),
    	allowNull: false,
	})
	userId: string;

	@BelongsTo(() => EaasiUser, {
		foreignKey: 'userId',
		onDelete: 'CASCADE'
	})
	user: EaasiUser
}
