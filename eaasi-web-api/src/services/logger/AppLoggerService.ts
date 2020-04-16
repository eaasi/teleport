import { ApplicationLog } from '@/data_access/models/app';

/**
 * Handles Application Log events retrieval
 */
export default class ApplicationLogService {
    
	private readonly model = ApplicationLog;
    
	async getAll() {
		return await this.model.findAll();
	}

}