describe('Checkbox Component', () => {

	beforeEach(function () {
		cy.visit('/');
	});

	const inputCheckBox = '[data-testid=\'Checkbox-example-1\'] .eaasi-checkbox.eaasi-form-control input';
	const guiCheckBox = '[data-testid=\'Checkbox-container\'] .eaasi-form-control.eaasi-checkbox .checkmark';

	it('When unchecked, clicking CheckBox causes CheckBox to be selected', () => {
		cy.get(guiCheckBox).click();
		cy.get(inputCheckBox).should('be.checked');
	});

	it('When checked, clicking CheckBox causes CheckBox to be unselected', () => {
		// Click once to turn on
		cy.get(guiCheckBox).click();
		// Click again to turn off
		cy.get(guiCheckBox).click();
		cy.get(inputCheckBox).should('not.be.checked');
	});
});
