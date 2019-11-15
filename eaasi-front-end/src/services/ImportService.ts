import EaasiTask from '@/models/task/EaasiTask';
import {IImageImport} from '@/types/Import';
import BaseHttpService from './BaseHttpService';
import config from '@/config';


/**
 * Handles making requests for importing images
 */
class ImportService extends BaseHttpService {
	/**
	 * Imports an image from a URL string
	 * @param imageImport: IImageImport object specifying image data
	 */
	async importImageFromUrl(imageImport: IImageImport) : Promise<EaasiTask> {
		const res = await this.post<IImageImport>(
			'/image/importFromUrl', imageImport
		);
		if (!res.ok) {
			console.log('Response returned error: ', res);
			return null;
		}
		return res.result as EaasiTask;
	}

	async saveImportImageRecord(imageImport: IImageImport) : Promise<any> {
		await this.post<IImageImport>(`${config.REST_API_URL}/importedImage`, imageImport);
	}
}

export default new ImportService();