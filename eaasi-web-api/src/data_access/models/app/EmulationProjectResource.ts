import { ResourceType } from '@/types/resource/Resource';
import { DataTypes } from 'sequelize';
import { BelongsTo, Column, CreatedAt, ForeignKey, Index, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { EmulationProject } from './EmulationProject';

@Table({
	tableName: 'emulation_project_resource'
})
export class EmulationProjectResource extends Model<EmulationProjectResource> {
    @CreatedAt
	readonly createdAt: Date = new Date();

    @UpdatedAt
    updatedAt: Date = new Date();

    @Column({
    	type: DataTypes.INTEGER,
    	allowNull: false,
    	primaryKey: true,
    	autoIncrement: true
    })
    readonly id: number;

	@Index({
		name: 'project-resource-index',
		type: 'UNIQUE'
	})
	@ForeignKey(() => EmulationProject)
	@Column({
    	type: DataTypes.INTEGER,
    	allowNull: false,
	})
    emulationProjectId: number;

	@Index({
		name: 'project-resource-index',
		type: 'UNIQUE'
	})
	@Column({
    	type: DataTypes.STRING,
    	allowNull: false,
	})
	resourceId: string;

	@Column({
    	type: DataTypes.STRING,
    	allowNull: false,
	})
	resourceType: ResourceType;

	@Column({
		type: DataTypes.STRING,
		allowNull: true,
	})
	archiveId: string;

	@BelongsTo(() => EmulationProject, 'emulationProjectId')
	emulationProject: EmulationProject;
}
