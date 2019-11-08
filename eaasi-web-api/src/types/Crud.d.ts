import { Model } from 'sequelize-typescript';

export interface IPaginatedResult<T extends Model> {
	result: T[];
	count: number;
	totalResults: number;
}
