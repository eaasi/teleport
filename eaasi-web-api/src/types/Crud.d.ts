import { Model } from 'sequelize';

export interface IPaginatedResult {
	results: Model[];
	count: number;
	totalResults: number;
}