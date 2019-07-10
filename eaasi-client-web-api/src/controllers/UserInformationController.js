const {UserInformation} = require('../data_access/models/index');
const UserInfo = UserInformation;

class UserInformationController {
	/**
	 * Get All UserInformation data
	 * @param req request
	 * @param res response
	 */
	getAll(req, res) {
		return UserInfo
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
		UserInfo.findByPk(id).then(user => {
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
		UserInfo.create(req.body).then(user =>
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
		return UserInfo.findByPk(id).then(user => {
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
		return UserInfo.findByPk(id).then(user => {
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
