import ImportedContentService from '@/services/rest-api/ImportedContentService';
import ImportedEnvironmentService from '@/services/rest-api/ImportedEnvironmentService';
import ImportedSoftwareService from '@/services/rest-api/ImportedSoftwareService';
import IResourceImportResult from '@/types/resource/ResourceImportResult';
import BaseService from '../base/BaseService';
import ImportedImageService from './ImportedImageService';

/**
 * Handles CRUD operations for User-Imported Resources (Environment, Software, Content)
 */
export default class ResourceImportService extends BaseService {

	private readonly _importedEnvironmentService: ImportedEnvironmentService;
	private readonly _importedSoftwareService: ImportedSoftwareService;
	private readonly _importedContentService: ImportedContentService;
	private readonly _importedImageService: ImportedImageService;

	constructor(
		importedEnvironmentService: ImportedEnvironmentService = new ImportedEnvironmentService(),
		importedSoftwareService: ImportedSoftwareService = new ImportedSoftwareService(),
		importedContentService: ImportedContentService = new ImportedContentService(),
		importedImageService: ImportedImageService = new ImportedImageService()
	) {
		super();
		this._importedEnvironmentService = importedEnvironmentService;
		this._importedSoftwareService = importedSoftwareService;
		this._importedContentService = importedContentService;
		this._importedImageService = importedImageService;
	}

	/**
     * Gets all Imported Content for a User
     * @param userID: number PK for the User
     */
	async getByUserID(userID: number): Promise<IResourceImportResult> {
		let userImportedEnvironments = await this._importedEnvironmentService.getByUserID(userID);
		let userImportedSoftware = await this._importedSoftwareService.getByUserID(userID);
		let userImportedContent = await this._importedContentService.getByUserID(userID);
		let userImportedImage = await this._importedImageService.getByUserID(userID);

		return {
			userID,
			userImportedEnvironments,
			userImportedSoftware,
			userImportedContent,
			userImportedImage
		}
	}
}