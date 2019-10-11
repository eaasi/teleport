import EmilBaseService from './EmilBaseService';

export default class EmilEnvironmentService extends EmilBaseService {

	constructor() {
		super('EmilEnvironmentData');
	}

	/**
	 * Gets aliases and entries for EaaSi Emulators
	 */
	async getNameIndexes() {
		return await this.get('getNameIndexes');
	}

}