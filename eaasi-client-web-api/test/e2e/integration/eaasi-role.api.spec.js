import {generateFakeRoleName} from "../../helpers/object_generators";

describe('eaasi-role endpoint', () => {
	/**
	 * Makes a GET HTTP request to get all EaaSIRole instances
	 * @returns {Cypress.Chainable<Cypress.Response>}
	 */
	const getAllRoles = () => {
		return cy.request('/eaasi-role').as('getAll')
	};

	/**
	 * Makes a GET HTTP request to get all EaaSIRole PKs
	 * @param pageSize
	 * @returns {Cypress.Chainable<any>}
	 */
	const getAllRolePks = pageSize => {
		return cy.request(`/eaasi-role?limit=${pageSize}`)
			.as('getAllPks')
			.then(response => {
			return response.body.result.map(item => item.id);
		});
	};

	/**
	 * Makes a POST HTTP request to add a single EaaSIRole to the database
	 * @param item
	 * @returns {Cypress.Chainable<Cypress.Response>}
	 */
	const addRole = item => {
		return cy.request({
			method: 'POST',
			url: '/eaasi-role',
			body: item,
			// don't fail on non-2xx/3xx; we can make assertions re: error response:
			failOnStatusCode: false
		}).as('addOne');
	};

	/**
	 * Makes a GET HTTP request to get a single EaaSIRole by id
	 * @param pk
	 * @returns {Cypress.Chainable<Cypress.Response>}
	 */
	const getRole = pk => {
		return cy.request({
			url: `/eaasi-role/${pk}`,
			// don't fail on non-2xx/3xx; we can make assertions re: error response:
			failOnStatusCode: false
		}).as('getOne')
	}

	/**
	 * Makes a DELETE HTTP request to delete a single EaaSIRole by id
	 * @param pk primary key
	 * @returns {Cypress.Chainable<Cypress.Response>}
	 */
	const deleteRole = pk => {
		return cy.request('DELETE', `/eaasi-role/${pk}`)
			.as('deleteOne')
	};

	/**
	 * Loops through all current PKs in the EaasiRole database and makes a single DELETE request for each
	 */
	const deleteAllRoles = () => {
		getAllRolePks(1000).then(all => {
			all.forEach(deleteRole)
		});
	};

	/**
	 * Makes a PUT HTTP request to update an existing record at pk with newData
	 * @param pk primary key
	 * @param newData object new data to update existing record
	 * @returns {Cypress.Chainable<Cypress.Response>}
	 */
	const updateRole = (pk, newData) => {
		return cy.request({
			method: 'PUT',
			url: `/eaasi-role/${pk}`,
			body: newData,
			// don't fail on non-2xx/3xx; we can make assertions re: error response:
			failOnStatusCode: false
		}).as('updateOne')
	};

	afterEach(deleteAllRoles);

	it('when making GET request for list results returns JSON content-type', () => {
		cy.request('/eaasi-role')
			.its('headers')
			.its('content-type')
			.should('include', 'application/json');
	});

	it('when making GET request for single result returns JSON content-type', () => {
		const adminRoleName = 'Test Admin';
		addRole({ id: 222, roleName: adminRoleName}).then(() => {
			cy.request('/eaasi-role/222')
				.its('headers')
				.its('content-type')
				.should('include', 'application/json');
		})
	});

	it('when making GET request to /eaasi-role => returns all EaasiRoles', () => {
		const adminRoleName = 'Test Admin';
		const managerRoleName = 'Test Manager';
		const contributorRoleName = 'Test Contributor';

		addRole({ roleName: managerRoleName });
		addRole({ roleName: adminRoleName });
		addRole({ roleName: contributorRoleName })

		let foundRoleNames = [];

		getAllRoles().should(response => {
			response.body.result.map(res => foundRoleNames.push(res.roleName))
			expect(foundRoleNames).to.deep.equal([managerRoleName, adminRoleName, contributorRoleName]);
		})
	});

	it('when making a POST request returns JSON content-type', () => {
		cy.request({
			url: '/eaasi-role',
			method: 'POST',
			body: {
				roleName: "foo"
			}
		}).its('headers')
			.its('content-type')
			.should('include', 'application/json');
	});


	it('when making POST request to /eaasi-role => returns new positive number instance id in response body', () => {
		addRole({ roleName: generateFakeRoleName()}).then(response => {
			expect(response.body.id).to.greaterThan(0);
		})
	});

	it('when making POST request to /eaasi-role => returns created role object in response body', () => {
		const fakeRoleName = generateFakeRoleName();
		addRole({ roleName: fakeRoleName }).then(response => {
			const responseRoleName = response.body.roleName;
			expect(responseRoleName).to.equal(fakeRoleName)
		});
	});

	it('when making POST request to /eaasi-role with invalid data => returns response with isOkStatusCode false', () => {
		const fakeRoleName = generateFakeRoleName();
		addRole({ notAProperty: fakeRoleName }).then(response => {
			cy.log(response)
			expect(response.isOkStatusCode).to.be.false
		});
	});

	it('when making PUT request to /eaasi-role/:pk => returns new instance id in response body with updates', () => {
		let updatedName = "New " + generateFakeRoleName()
		addRole({ roleName: generateFakeRoleName()}).then(response => {
			let newId = response.body.id;
			updateRole(newId, { roleName: updatedName}).then(() => {
				getRole(newId).then(response => {
					expect(response.body.roleName).to.equal(updatedName);
				});
			});
		});
	});

	it('when making PUT request to /eaasi-role/:pk => returns 200 response', () => {
		let updatedName = "New " + generateFakeRoleName()
		addRole({ roleName: generateFakeRoleName()}).then(response => {
			let newId = response.body.id;
			updateRole(newId, { roleName: updatedName}).then(() => {
				getRole(newId).then(response => {
					expect(response.status).to.equal(200);
				});
			});
		});
	});

	it('when making PUT request to /eaasi-role/:pk => returns response with isOkStatusCode true', () => {
		let updatedName = "New " + generateFakeRoleName()
		addRole({ roleName: generateFakeRoleName()}).then(response => {
			let newId = response.body.id;
			updateRole(newId, { roleName: updatedName}).then(() => {
				getRole(newId).then(response => {
					expect(response.isOkStatusCode).to.be.true;
				});
			});
		});
	});

	it('when making PUT request to /eaasi-role/:pk for non-existent pk => returns response with isOkStatusCode false', () => {
		updateRole(-1, { roleName: "foo"}).then(resp => {
			expect(resp.isOkStatusCode).to.be.false;
		});
	});

	it('when making PUT request to /eaasi-role/:pk for non-existent pk => returns response with status 404', () => {
		updateRole(-1, { roleName: "foo"}).then(resp => {
			expect(resp.status).to.equal(404);
		});
	});

	it('when after making DELETE request to /eaasi-role/:pk => get request for same PK is error', () => {
		const fakeRoleName = generateFakeRoleName();
		addRole({ roleName: fakeRoleName }).then(response => {
			let newId = response.body.id;
			deleteRole(newId).then(() => {
				getRole(newId).then(response => {
					expect(response.body.hasError).to.be.true;
				});
			})
		});
	})

	it('when after DELETE request to /eaasi-role/:pk => get request for same PK has status 404', () => {
		const fakeRoleName = generateFakeRoleName();
		addRole({ roleName: fakeRoleName }).then(response => {
			let newId = response.body.id;
			deleteRole(newId).then(() => {
				getRole(newId).then(response => {
					expect(response.body.status).to.equal(404);
				});
			})
		});
	})

	it('when after DELETE request to /eaasi-role/:pk => get request for same PK provides helpful message', () => {
		const fakeRoleName = generateFakeRoleName();
		addRole({ roleName: fakeRoleName }).then(response => {
			let newId = response.body.id;
			deleteRole(newId).then(() => {
				getRole(newId).then(response => {
					expect(response.body.message).to.equal(
						`Resource was not found at the requested location: /api/eaasi-role/${newId}`
					);
				});
			})
		});
	})
});
