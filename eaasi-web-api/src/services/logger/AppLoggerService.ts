import { ApplicationLog } from '@/data_access/models/app';
import { Op } from 'sequelize';

/**
 * Handles Application Log events retrieval
 */
export default class ApplicationLogService {
    
	private readonly model = ApplicationLog;
    
	async getAll() {
		return await this.model.findAll();
	}

	async getMostRecent() {
		const startDate = new Date().setMinutes(new Date().getMinutes() - 30);
		const endDate = new Date();
		return await this.model.findAll({
			where: {
				updatedAt: {
					[Op.between]: [startDate, endDate]
				},
			},
			raw: true
		})
	}

}