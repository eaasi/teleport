import {generateFakeUsername} from "../../helpers/object_generators";

describe('eaasi-user endpoint', () => {
	/**
	 * Makes a GET HTTP request to get all EaaSIUser instances
	 * @returns {Cypress.Chainable<Cypress.Response>}
	 */
	const getAllUsers = () => {
		return cy.request('/eaasi-user').as('getAll')
	};

	/**
	 * Makes a GET HTTP request to get all EaaSIUser PKs
	 * @param pageSize
	 * @returns {Cypress.Chainable<any>}
	 */
	const getAllUserPks = pageSize => {
		return cy.request(`/eaasi-user?limit=${pageSize}`)
			.as('getAllPks')
			.then(response => {
				return response.body.result.map(item => item.id);
			});
	};

	/**
	 * Makes a POST HTTP request to add a single EaaSIUser to the database
	 * @param item
	 * @returns {Cypress.Chainable<Cypress.Response>}
	 */
	const addUser = item => {
		return cy.request({
			method: 'POST',
			url: '/eaasi-user',
			body: item,
			// don't fail on non-2xx/3xx; we can make assertions re: error response:
			failOnStatusCode: false
		}).as('addOne');
	};

	/**
	 * Makes a GET HTTP request to get a single EaaSIUser by id
	 * @param pk
	 * @returns {Cypress.Chainable<Cypress.Response>}
	 */
	const getUser = pk => {
		return cy.request({
			url: `/eaasi-user/${pk}`,
			// don't fail on non-2xx/3xx; we can make assertions re: error response:
			failOnStatusCode: false
		}).as('getOne')
	}

	/**
	 * Makes a DELETE HTTP request to delete a single EaaSIUser by id
	 * @param pk primary key
	 * @returns {Cypress.Chainable<Cypress.Response>}
	 */
	const deleteUser = pk => {
		return cy.request('DELETE', `/eaasi-user/${pk}`)
			.as('deleteOne')
	};

	/**
	 * Loops through all current PKs in the EaasiUser database and makes a single DELETE request for each
	 */
	const deleteAllUsers = () => {
		getAllUserPks(1000).then(all => {
			all.forEach(deleteUser)
		});
	};

	/**
	 * Makes a PUT HTTP request to update an existing record at pk with newData
	 * @param pk primary key
	 * @param newData object new data to update existing record
	 * @returns {Cypress.Chainable<Cypress.Response>}
	 */
	const updateUser = (pk, newData) => {
		return cy.request({
			method: 'PUT',
			url: `/eaasi-user/${pk}`,
			body: newData,
			// don't fail on non-2xx/3xx; we can make assertions re: error response:
			failOnStatusCode: false
		}).as('updateOne')
	};

	afterEach(deleteAllUsers);

	it('when making GET request for list results returns JSON content-type', () => {
		cy.request('/eaasi-user')
			.its('headers')
			.its('content-type')
			.should('include', 'application/json');
	});

	it('when making GET request for single result returns JSON content-type', () => {
		const adminUserName = 'Johnny';
		addUser({ id: 1986, username: adminUserName}).then(() => {
			cy.request('/eaasi-user/1986')
				.its('headers')
				.its('content-type')
				.should('include', 'application/json');
		})
	});

	it('when making GET request to /eaasi-user => returns all EaasiUsers', () => {
		const adminUserName = 'Test Admin';
		const managerUserName = 'Test Manager';
		const contributorUserName = 'Test Contributor';

		addUser({ username: managerUserName });
		addUser({ username: adminUserName });
		addUser({ username: contributorUserName })

		let foundUserNames = [];

		getAllUsers().should(response => {
			response.body.result.map(res => foundUserNames.push(res.username))
			expect(foundUserNames).to.deep.equal([managerUserName, adminUserName, contributorUserName]);
		})
	});

	it('when making a POST request returns JSON content-type', () => {
		cy.request({
			url: '/eaasi-user',
			method: 'POST',
			body: {
				username: "foo"
			}
		}).its('headers')
			.its('content-type')
			.should('include', 'application/json');
	});


	it('when making POST request to /eaasi-user => returns new positive number instance id in response body', () => {
		addUser({ username: generateFakeUsername()}).then(response => {
			expect(response.body.id).to.greaterThan(0);
		})
	});

	it('when making POST request to /eaasi-user => returns created user object in response body', () => {
		const fakeUserName = generateFakeUsername();
		addUser({ username: fakeUserName }).then(response => {
			const responseUserName = response.body.username;
			expect(responseUserName).to.equal(fakeUserName)
		});
	});

	it('when making POST request to /eaasi-user with invalid data => returns response with isOkStatusCode false', () => {
		const fakeUserName = generateFakeUsername();
		addUser({ notAProperty: fakeUserName }).then(response => {
			expect(response.isOkStatusCode).to.be.false
		});
	});

	it('when making PUT request to /eaasi-user/:pk => returns new instance id in response body with updates', () => {
		let updatedName = "New " + generateFakeUsername()
		addUser({ username: generateFakeUsername()}).then(response => {
			let newId = response.body.id;
			updateUser(newId, { username: updatedName}).then(() => {
				getUser(newId).then(response => {
					expect(response.body.username).to.equal(updatedName);
				});
			});
		});
	});

	it('when making PUT request to /eaasi-user/:pk => returns 200 response', () => {
		let updatedName = "New " + generateFakeUsername()
		addUser({ username: generateFakeUsername()}).then(response => {
			let newId = response.body.id;
			updateUser(newId, { username: updatedName}).then(() => {
				getUser(newId).then(response => {
					expect(response.status).to.equal(200);
				});
			});
		});
	});

	it('when making PUT request to /eaasi-user/:pk => returns response with isOkStatusCode true', () => {
		let updatedName = "New " + generateFakeUsername()
		addUser({ username: generateFakeUsername()}).then(response => {
			let newId = response.body.id;
			updateUser(newId, { username: updatedName}).then(() => {
				getUser(newId).then(response => {
					expect(response.isOkStatusCode).to.be.true;
				});
			});
		});
	});

	it('when making PUT request to /eaasi-user/:pk for non-existent pk => returns response with isOkStatusCode false', () => {
		updateUser(-1, { username: "foo"}).then(resp => {
			expect(resp.isOkStatusCode).to.be.false;
		});
	});

	it('when making PUT request to /eaasi-user/:pk for non-existent pk => returns response with status 404', () => {
		updateUser(-1, { username: "foo"}).then(resp => {
			expect(resp.status).to.equal(404);
		});
	});

	it('when after making DELETE request to /eaasi-user/:pk => get request for same PK is error', () => {
		const fakeUserName = generateFakeUsername();
		addUser({ username: fakeUserName }).then(response => {
			let newId = response.body.id;
			deleteUser(newId).then(() => {
				getUser(newId).then(response => {
					expect(response.body.hasError).to.be.true;
				});
			})
		});
	})

	it('when after DELETE request to /eaasi-user/:pk => get request for same PK has status 404', () => {
		const fakeUserName = generateFakeUsername();
		addUser({ username: fakeUserName }).then(response => {
			let newId = response.body.id;
			deleteUser(newId).then(() => {
				getUser(newId).then(response => {
					expect(response.body.status).to.equal(404);
				});
			})
		});
	})

	it('when after DELETE request to /eaasi-user/:pk => get request for same PK provides helpful message', () => {
		const fakeUserName = generateFakeUsername();
		addUser({ username: fakeUserName }).then(response => {
			let newId = response.body.id;
			deleteUser(newId).then(() => {
				getUser(newId).then(response => {
					expect(response.body.message).to.equal(
						`Resource was not found at the requested location: /api/eaasi-user/${newId}`
					);
				});
			})
		});
	})
});

