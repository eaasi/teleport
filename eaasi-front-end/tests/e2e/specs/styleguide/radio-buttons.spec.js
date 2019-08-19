describe('RadioButtons Component', () => {

	const radioBtn1 = '#radio-buttons-wrapper input[value=\'North\']';
	const radioBtn2 = '#radio-buttons-wrapper input[value=\'South\']';
	const radioBtn3 = '#radio-buttons-wrapper input[value=\'East\']';
	const radioBtn4 = '#radio-buttons-wrapper input[value=\'West\']';
	const selectedValue = '#radio-button-selected-value';

	beforeEach(function() {
		cy.visit('/');
	});

	it('Updates bound field with selected option', () => {
		cy.get(radioBtn1).as('North Button').click();
		cy.get(selectedValue).contains('Selected: North');
		cy.get(radioBtn2).as('South Button').click();
		cy.get(selectedValue).contains('Selected: South');
		cy.get(radioBtn3).as('East Button').click();
		cy.get(selectedValue).contains('Selected: East');
		cy.get(radioBtn4).as('West Button').click();
		cy.get(selectedValue).contains('Selected: West');
	});
});
