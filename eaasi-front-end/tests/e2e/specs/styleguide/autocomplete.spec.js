describe('Autocomplete Component', () => {

	const autocompleteInput = '.autocomplete-wrapper .eaasi-input-wrapper .eaasi-input input';
	const firstAutocompleteResult = '.autocomplete-wrapper #result0';

	beforeEach(function() {
		cy.visit('/');
	});

	it('Performs autocomplete with partial search', () => {
		cy.get(autocompleteInput).type('cole.com');
		cy.contains('Annabelle@cole.com');
	});

	it('Given valid result in list results, clicking suggestion maps value to input field', () => {
		cy.get(autocompleteInput).as('Autocomplete Input Field').type('Eldora@m');
		cy.get(firstAutocompleteResult).as('First Autocomplete Result').click();
		cy.get(autocompleteInput).should('have.value', 'Eldora@madge.com');
	});
});
