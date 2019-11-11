import EaasiTask from '@/models/task/EaasiTask';
import BaseHttpService from './BaseHttpService';


class ImportService extends BaseHttpService {

	async importImageFromUrl(image: any) : Promise<EaasiTask> {
		let res = await this.post<any>(
			'/image/importFromUrl', {
				nativeConfig: image.nativeConfig,
				patchId: image.patchId,
				templateId: image.templateId,
				urlString: image.urlString
			}
		);

		if (!res.ok) {
			console.log('Response returned error: ', res);
			return null;
		}

		return res.result as EaasiTask;
	}
}

export default new ImportService();