const Users = require('../data_access/models/index').UserInformation;

class UserInformationController {
	/**
	 * Get All UserInformation data
	 * @param req request
	 * @param res response
	 */
	getAll(req, res) {
		return Users
			.findAll()
			.then(users => res.status(200).send(users))
			.catch(error => res.status(400).send(error));
	}

	/**
	 * Get a UserInformation resource by ID
	 * @param req request
	 * @param res response
	 */
	get(req, res) {
		const id = req.params.id;
		Users.findByPk(id).then(user => {
			if (!user) {
				return res.status(404).send({
					message: 'UserInformation not found.'
				});
			}
			return res.json(user);
		});
	}

	/**
	 * Create a new UserInformation resource
	 * @param req request
	 * @param res response
	 */
	create(req, res) {
		console.log(req.body)
		Users.create(req.body).then(user =>
			res.status(201).send(user)
		);
	}

	/**
	 * Update a UserInformation resource by ID
	 * @param req request
	 * @param res response
	 */
	update(req, res) {
		const id = req.params.id;
		return Users.findByPk(id).then(user => {
			if (!user) {
				return res.status(404).send({
					message: 'UserInformation not found.'
				});
			}
			return user.update({
				user: req.body
			}).then(() => res.status(200).send(user))
				.catch((error) => res.status(400).send(error));
		}).catch((error) => res.status(400).send(error));
	}

	/**
	 * Delete a UserInformation resource by ID
	 * @param req request
	 * @param res response
	 */
	delete(req, res) {
		const id = req.params.id;
		return Users.findByPk(id).then(user => {
			if (!user) {
				return res.status(404).send({
					message: 'UserInformation not found.'
				});
			}
			return user.destroy({
				where: { id }
			}).then(() => res.status(204).send())
				.catch(error => res.status(400).send(error));
		}).catch(error => res.status(400).send(error));
	}
}

module.exports = UserInformationController;
