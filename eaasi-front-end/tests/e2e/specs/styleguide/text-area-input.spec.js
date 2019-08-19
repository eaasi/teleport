import faker from 'faker';

describe('Text Area Input Component', () => {

	beforeEach(function () {
		cy.visit('/');
	});

	const textAreaInput = '#example-text-area-input-wrapper textarea';
	const fakeText = faker.random.words(30);

	it('Contains text when a user types content into the text area input field', () => {
		cy.get(textAreaInput).type(fakeText);
		cy.get(textAreaInput).invoke('val').should('contain', fakeText);
	});
});
