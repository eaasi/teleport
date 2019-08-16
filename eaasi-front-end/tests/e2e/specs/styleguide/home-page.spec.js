describe('EaaSI Vue Components Style Guide', () => {
	it('Visits the Style Guide home page', () => {
		cy.visit('/');
		cy.contains('EaaSI Vue Components Style Guide');
	});
});