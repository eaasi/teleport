describe('Select List Component', () => {

	beforeEach(function () {
		cy.visit('/');
	});

	const selectListDropDown = '[data-testid=\'SelectList-example-1\'] .eaasi-select select';
	const selectListStateDiv = '#select-list-value';

	it('When an option is selected, bound DOM element updates with selected value', () => {
		cy.get(selectListDropDown).select('Option 3');
		cy.get(selectListStateDiv).contains('Selected: Option 3');
	});
});
