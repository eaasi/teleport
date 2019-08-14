describe('Small Bookmark Component', () => {

	beforeEach(function () {
		cy.visit('/');
		cy.get('nav [href=\'/#/Global%20Components\']').click();
	});

	const smallBookmark = '#small-bookmark-example svg';
	const bookmarkMessage = '#small-bookmark-example .bookmark .add-remove-message';
	const removeMessage = 'Remove Bookmark';
	const addMessage = 'Add Bookmark';

	it('When clicked toggles between "Remove Bookmark" and "Add Bookmark" message', () => {
		cy.get(bookmarkMessage).should('contain', addMessage);
		cy.get(smallBookmark).click();
		cy.get(bookmarkMessage).should('contain', removeMessage);
		cy.get(smallBookmark).click();
		cy.get(bookmarkMessage).should('contain', addMessage);
	});
});
