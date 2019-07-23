class EaasiAuthController {
	constructor() {

	}
	/**
	 * Logs a user in
	 * @param req request
	 * @param res response
	 */
	async login(req, res) {
		// TODO
		console.log("Not implemented");
		await res.json({});
	}

	/**
	 * Logs a user out
	 * @param req request
	 * @param res response
	 */
	async logout(req, res) {
		// TODO
		console.log("Not implemented");
		await res.json({})
	}

	/**
	 * Renews a JWT
	 * @param req request
	 * @param res response
	 */
	async refresh(req, res) {
		// TODO
		console.log("Not implemented");
		await res.json({});
	}
}

module.exports = EaasiAuthController;
