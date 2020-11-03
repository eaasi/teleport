import HttpResponseCode from '@/classes/HttpResponseCode';
import ImportedContentService from '@/services/rest-api/ImportedContentService';
import ImportedEnvironmentService from '@/services/rest-api/ImportedEnvironmentService';
import ImportedImageService from '@/services/rest-api/ImportedImageService';
import ImportedSoftwareService from '@/services/rest-api/ImportedSoftwareService';
import { IUserImportedResource, IUserImportRelationRequest } from '@/services/rest-api/UserImportRelation';
import { IAuthorizedPostRequest } from '@/types/auth/Auth';
import { IUserImportResponse } from '@/types/resource/ResourceImportResult';
import { resourceTypes } from '@/utils/constants';
import { build_400_response, build_404_response, build_500_response } from '@/utils/error-helpers';
import { Request, Response } from 'express-serve-static-core';
import BaseController from '../base/BaseController';

export default class UserImportController extends BaseController {

	readonly importedEnvironmentService: ImportedEnvironmentService;
	readonly importedSoftwareService: ImportedSoftwareService;
	readonly importedContentService: ImportedContentService;
	readonly importedImageService: ImportedImageService;

	constructor(
		importedEnvironmentService = new ImportedEnvironmentService(),
		importedSoftwareService = new ImportedSoftwareService(),
		importedContentService = new ImportedContentService(),
		importedImageService = new ImportedImageService(),
	)
	{
		super();
		this.importedEnvironmentService = importedEnvironmentService;
		this.importedSoftwareService = importedSoftwareService;
		this.importedContentService = importedContentService;
		this.importedImageService = importedImageService;
	}

	/**
	 * Gets all imported resources by user id
	 * @param req request
	 * @param res response
	 */
	async getByUserID(req: Request, res: Response) {

		const userId = Number(req.query.userId);

		if (userId == null) {
			return res
				.status(HttpResponseCode.BAD_REQUEST)
				.send(build_400_response(req.query));
		}

		let importedContent = await this.importedContentService.getByUserID(userId);
		let importedSoftware = await this.importedSoftwareService.getByUserID(userId);
		let importedEnvironments = await this.importedEnvironmentService.getByUserID(userId);
		let importedImages = await this.importedImageService.getByUserID(userId);

		let response = {
			importedContent: importedContent.result,
			importedSoftware: importedSoftware.result,
			importedEnvironments: importedEnvironments.result,
			importedImages: importedImages.result
		};
		
		let imports: IUserImportResponse = { importedContent, importedSoftware, importedEnvironments, importedImages };

		if (UserImportController.hasAnyError(imports)) {
			let error = UserImportController.handleImportError(imports);
			return res
				.status(HttpResponseCode.SERVER_ERROR)
				.send(build_500_response(error));
		}

		if (this.hasNoResults(imports)) {
			return res
				.status(HttpResponseCode.NOT_FOUND)
				.send(build_404_response(req.originalUrl));
		}

		return res.status(HttpResponseCode.OK).send(response);
	}

	/**
	 * Creates a new imported software resource and persists to database
	 * @param req request
	 * @param res response
	 */
	async createImportedSoftwareRelation(req: Request, res: Response) {
		const newObject = req.body;

		if (newObject == null) {
			return res
				.status(HttpResponseCode.BAD_REQUEST)
				.send(build_400_response(req.body));
		}

		let response = await this.importedSoftwareService.create(newObject);

		if (response.hasError) {
			return res
				.status(HttpResponseCode.SERVER_ERROR)
				.send(build_500_response(response.error));
		}

		return res.status(HttpResponseCode.CREATED).send(response.result);
	}

	/**
	 * Creates a new imported content resource and persists to database
	 * @param req request
	 * @param res response
	 */
	async createImportedContentRelation(req: Request, res: Response) {
		const newObject = req.body;

		if (newObject == null) {
			return res
				.status(HttpResponseCode.BAD_REQUEST)
				.send(build_400_response(req.body));
		}

		let response = await this.importedContentService.create(newObject);

		if (response.hasError) {
			return res
				.status(HttpResponseCode.SERVER_ERROR)
				.send(build_500_response(response.error));
		}

		return res.status(HttpResponseCode.CREATED).send(response.result);
	}

	/**
	 * Creates a new imported content resource and persists to database
	 * @param req request
	 * @param res response
	 */
	async createImportedImageRelation(req: Request, res: Response) {
		const newObject = req.body;

		if (newObject == null) {
			return res
				.status(HttpResponseCode.BAD_REQUEST)
				.send(build_400_response(req.body));
		}

		let response = await this.importedImageService.create(newObject);

		if (response.hasError) {
			return res
				.status(HttpResponseCode.SERVER_ERROR)
				.send(build_500_response(response.error));
		}

		return res.status(HttpResponseCode.CREATED).send(response.result);
	}

	/**
	 * DEPRECATED: Creates a new imported environment resource and persists to database
	 * @param req request
	 * @param res response
	 */
	async createImportedEnvironmentRelation(req: Request, res: Response) {
		const newObject = req.body;

		if (newObject == null) {
			return res
				.status(HttpResponseCode.BAD_REQUEST)
				.send(build_400_response(req.body));
		}

		let response = await this.importedEnvironmentService.create(newObject);

		if (response.hasError) {
			return res
				.status(HttpResponseCode.SERVER_ERROR)
				.send(build_500_response(response.error));
		}

		return res.status(HttpResponseCode.CREATED).send(response.result);
	}

	/**
	 * Builds an error message
	 * @param imports
	 */
	private static handleImportError(imports: IUserImportResponse): string {

		let error = '';

		if (imports.importedContent && imports.importedContent.error) {
			let contentError = imports.importedContent.error;
			error += `Imported Content Error: ${contentError}`;
		}

		if (imports.importedImages && imports.importedImages.error) {
			let imageError = imports.importedImages.error;
			error += `Imported Image Error: ${imageError}`;
		}

		if (imports.importedEnvironments && imports.importedEnvironments.error) {
			let environmentError = imports.importedEnvironments.error;
			error += `Imported Environment Error: ${environmentError}`;
		}

		if (imports.importedSoftware && imports.importedSoftware.error) {
			let softwareError = imports.importedSoftware.error;
			error += `Imported Software Error: ${softwareError}`;
		}

		return error || 'Unspecified error'
	}

	async createUserImportRelation(req: IAuthorizedPostRequest<IUserImportRelationRequest>, res: Response) {
		try {
			const userImportRelation = req.body;
			if (!req.body) this.sendClientError(new Error('Request to create user reference requires request body'), res);
			const user = req.user;
			const userImportResource: IUserImportedResource = {
				userId: user.id,
				eaasiId: userImportRelation.resourceId
			}
			let result: IUserImportedResource;
			switch(userImportRelation.resourceType) {
				case resourceTypes.IMAGE:
					const imageResult = await this.importedImageService.create(userImportResource);
					result = imageResult.result.get({ plain: true }) as IUserImportedResource;
					break;
				case resourceTypes.CONTENT:
					const contentresult = await this.importedContentService.create(userImportResource);
					if (contentresult.hasError) throw contentresult.error;
					result = contentresult.result.get({ plain: true }) as IUserImportedResource;
					break;
				case resourceTypes.SOFTWARE:
					const softwareResult = await this.importedSoftwareService.create(userImportResource);
					if (softwareResult.hasError) throw softwareResult.error;
					result = softwareResult.result.get({ plain: true }) as IUserImportedResource;
					break;
				case resourceTypes.ENVIRONMENT:
					const environmentResult = await this.importedEnvironmentService.create(userImportResource);
					if (environmentResult.hasError) throw environmentResult.error;
					result = environmentResult.result.get({ plain: true }) as IUserImportedResource;
					break;
			}
			res.send(result);
		} catch(e) {
			this.sendError(e.message, res);
		}
	}

	/**
	 * True if any imported resource object hasError property is truthy
	 * @param imports
	 */
	private static hasAnyError(imports: IUserImportResponse): boolean {
		return imports.importedContent.hasError
		|| imports.importedSoftware.hasError
		|| imports.importedEnvironments.hasError
		|| imports.importedImages.hasError
	}

	/**
	 * True if all imported resources on response are null
	 * @param response
	 */
	private hasNoResults(response: IUserImportResponse): boolean {
		return response.importedSoftware == null
			&& response.importedEnvironments == null
			&& response.importedContent == null
			&& response.importedImages == null
	}

}
