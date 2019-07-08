const user = require('../data_access/models/index').UserInformation;

class UserController {
	/**
	 * Get All UserInformation data
	 * @param req request
	 * @param res response
	 */

	getAll(req, res) {
		user.findAll().then(users =>
			res.json({
				is_error: false,
				data: users
			})).catch(error => res.json({
			is_error: true,
			data: [],
			error: error
		}))
	}

	/**
	 * Get a UserInformation resource by ID
	 * @param req request
	 * @param res response
	 */
	get(req, res) {
		const id = req.params.id
		user.findByPk(id).then(user => res.json(user))
	}

	/**
	 * Create a new UserInformation resource
	 * @param req request
	 * @param res response
	 */
	create(req, res) {
		user.create(req.body).then(user => res.status(201).send(user))
	}

	/**
	 * Update a UserInformation resource by ID
	 * @param req request
	 * @param res response
	 */
	update(req, res){
		const id = req.params.id;
		return user.findByPk(id).then(user => {
			if (!user){
				return res.status(404).send({
					message: 'UserInformation not found.'
				});
			}
			return user.update({
				user: req.body
			}).then(() => res.status(200).send(user)).catch((error) => res.status(400).send(error));
		}).catch((error) => res.status(400).send(error));
	}

	/**
	 * Delete a UserInformation resource by ID
	 * @param req request
	 * @param res response
	 */
	delete(req, res){
		const id = req.params.id;
		user.destroy({
			where: { id }
		}).then(() => res.redirect("/user/list"))
	}
}
