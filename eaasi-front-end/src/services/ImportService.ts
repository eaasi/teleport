import EaasiTask from '@/models/task/EaasiTask';
import {IEnvironmentImportSnapshot, IResourceImport} from '@/types/Import';
import BaseHttpService from './BaseHttpService';


/**
 * Handles making requests for importing images
 */
class ImportService extends BaseHttpService {
	/**
	 * Imports a resource from a URL string
	 * @param resourceImport: IResourceImport object specifying image data
	 */
	async importFromUrl(resourceImport: IResourceImport) : Promise<EaasiTask> {
		const res = await this.post<IResourceImport>(
			'/import/url', resourceImport
		);
		if (!res.ok) {
			console.log('Response returned error: ', res);
			return null;
		}
		return res.result as EaasiTask;
	}

	async saveEnvironment(snapshot: IEnvironmentImportSnapshot) : Promise<any> {
		const res = await this.post<IResourceImport>(
			'/import/saveEnvironment', snapshot
		);
		if (!res.ok) {
			console.log('Response returned error: ', res);
			return null;
		}
		return res.result;
	}
}

export default new ImportService();