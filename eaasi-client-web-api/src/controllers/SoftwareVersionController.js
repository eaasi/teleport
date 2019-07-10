const SoftwareVersion = require('../data_access/models/index').SoftwareVersion;

class SoftwareVersionController {
	/**
	 * Get All SoftwareVersion data
	 * @param req request
	 * @param res response
	 */
	getAll(req, res) {
		return SoftwareVersion
			.findAll()
			.then(sv => res.status(200).send(sv))
			.catch(error => res.status(400).send(error));
	}

	/**
	 * Get a SoftwareVersion resource by ID
	 * @param req request
	 * @param res response
	 */
	get(req, res) {
		const id = req.params.id;
		SoftwareVersion.findByPk(id).then(sv => {
			if (!sv) {
				return res.status(404).send({
					message: 'SoftwareVersion not found.'
				});
			}
			return res.json(sv);
		});
	}

	/**
	 * Create a new SoftwareVersion resource
	 * @param req request
	 * @param res response
	 */
	create(req, res) {
		SoftwareVersion.create(req.body).then(sv =>
			res.status(201).send(sv)
		);
	}

	/**
	 * Update a SoftwareVersion resource by ID
	 * @param req request
	 * @param res response
	 */
	update(req, res) {
		const id = req.params.id;
		return SoftwareVersion.findByPk(id).then(sv => {
			if (!sv) {
				return res.status(404).send({
					message: 'SoftwareVersion not found.'
				});
			}
			return sv.update({
				sv: req.body
			}).then(() => res.status(200).send(sv))
				.catch((error) => res.status(400).send(error));
		}).catch((error) => res.status(400).send(error));
	}

	/**
	 * Delete a SoftwareVersion resource by ID
	 * @param req request
	 * @param res response
	 */
	delete(req, res) {
		const id = req.params.id;
		return SoftwareVersion.findByPk(id).then(sv => {
			if (!sv) {
				return res.status(404).send({
					message: 'SoftwareVersion not found.'
				});
			}
			return sv.destroy({
				where: { id }
			}).then(() => res.status(204).send())
				.catch(error => res.status(400).send(error));
		}).catch(error => res.status(400).send(error));
	}
}

module.exports = SoftwareVersionController;
