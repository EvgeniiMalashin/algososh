describe('Приложение доступно', () => {
	it('Приложение доступно по адресу localhost:3000', function() {
		cy.visit('http://localhost:3000/');
	});
});