describe('TabbedNav Component', () => {

	const firstTab = '#example-tabbed-nav-wrapper > div > ul > li:nth-child(1)';
	const secondTab = '#example-tabbed-nav-wrapper > div > ul > li:nth-child(2)';
	const thirdTab = '#example-tabbed-nav-wrapper > div > ul > li:nth-child(3)';

	const selectedValue = '#example-tabbed-nav-wrapper li.active';

	beforeEach(function() {
		cy.visit('/');
		cy.get('nav [href=\'/#/Global%20Components\']').click();
	});

	it('When tab is clicked => updates the active selected tab', () => {
		cy.get(firstTab).as('First Tab').click();
		cy.get(selectedValue).contains('First');

		cy.get(secondTab).as('Second Tab').click();
		cy.get(selectedValue).contains('Second');

		cy.get(thirdTab).as('Third Tab').click();
		cy.get(selectedValue).contains('Third');

		cy.get(secondTab).as('Second Tab').click();
		cy.get(selectedValue).contains('Second');

		cy.get(firstTab).as('First Tab').click();
		cy.get(selectedValue).contains('First');
	});
});
