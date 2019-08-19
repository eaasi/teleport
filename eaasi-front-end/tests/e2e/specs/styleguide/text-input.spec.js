import faker from 'faker';

describe('Text Input Component', () => {

	beforeEach(function () {
		cy.visit('/');
	});

	const textAreaInput = '#example-text-input-wrapper input';
	const fakeText = faker.random.words(5);

	it('Contains text when a user types content into the text input field', () => {
		cy.get(textAreaInput).type(fakeText);
		cy.get(textAreaInput).invoke('val').should('contain', fakeText);
	});
});
