import HttpResponseCode from '@/utils/HttpResponseCode';
import { build_500_response } from '@/utils/error-helpers';

export default class BaseController {

	sendError(error: string, response: Express.Response) {
		response.status(HttpResponseCode.SERVER_ERROR)
			.send(build_500_response(error));
	}

}