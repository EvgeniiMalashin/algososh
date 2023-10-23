import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

const circle = "[class*=circle_circle]";

describe("Страница загружена", function () {
	beforeEach(function () {
		cy.visit('http://localhost:3000/fibonacci');
	});

	it('Кнопка заблокирована когда инпут пуст', () => {
		cy.get('input').clear();
		cy.get('button').should('be.disabled');
	})

	it('Числа фибоначи должны выводится пользователю правильно по значению и по порядку', () => {
		cy.get('input').clear();
		cy.get('input').type('3').should('have.value', '3');
		cy.get('button').contains('Расcчитать').click();

		cy.clock();

		cy.get(circle).should('have.length', 1).eq(0).contains('1');

		cy.tick(SHORT_DELAY_IN_MS);

		cy.get(circle).should('have.length', 2).eq(1).contains('1');

		cy.tick(SHORT_DELAY_IN_MS);

		cy.get(circle).should('have.length', 3).eq(2).contains('2');

		cy.tick(SHORT_DELAY_IN_MS);

		cy.get(circle).should('have.length', 4).eq(3).contains('3');

	})
})