import BaseCrudController from '@/controllers/base/BaseCrudController';
import EaasiBookmarkService from '../../services/rest-api/EaasiBookmarkService';
import UserAdminService from '@/services/admin/UserAdminService';
import { Request, Response } from 'express-serve-static-core';
import HttpResponseCode from '@/utils/HttpResponseCode';
import { build_400_response, build_500_response } from '@/utils/error-helpers';
import CrudService from '@/services/base/CrudService';

class EaasiBookmarkController extends BaseCrudController {

	private _userService: UserAdminService;
	private crudService: CrudService;

	constructor(userService: UserAdminService) {
		super(new EaasiBookmarkService());
		this._userService = userService;
		this.crudService = new CrudService(new EaasiBookmarkService());
	}

	async create(req: Request, res: Response) {
		const { resourceID } = req.body;
		const newObject = { resourceID, userID: 2 };

		if (newObject == null) {
			return await res
				.status(HttpResponseCode.BAD_REQUEST)
				.send(build_400_response(req.body));
		}

		let response = await this.crudService.create(newObject);

		if (response.hasError) {
			return await res
				.status(HttpResponseCode.SERVER_ERROR)
				.send(build_500_response(response.error));
		}

		return await res.status(HttpResponseCode.CREATED).send(response.result);
	}

}

module.exports = EaasiBookmarkController;
