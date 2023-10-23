import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

const addButton = "[data-testid='addButton']";
const deleteButton = "[data-testid='deleteButton']";
const clearButton =  "[data-testid='clearButton']";

const defaultColor = "rgb(0, 50, 255)";
const changingColor = "rgb(210, 82, 225)";

const circle = "[class*=circle_circle]";

describe('Страница загружена', () => {
	beforeEach(() => {
		cy.visit(`http://localhost:3000/stack`);
	})

	it('Кнопка добавления заблокирована когда инпут пуст', () => {
		cy.get('input').clear();
		cy.get(addButton).should('be.disabled');
	})

	it("Добавление", function () {
		cy.get('input').type('1').should('have.value', '1');
		cy.get(addButton).click();

		cy.get(circle)
			.should('have.length', 1)
			.eq(0)
			.should('have.css', 'border-color', changingColor)
			.contains('1');

		cy.wait(SHORT_DELAY_IN_MS);

		cy.get(circle).eq(0).should('have.css', 'border-color', defaultColor).contains('1');

		cy.get('input').type('2').should('have.value', '2');
		cy.get(addButton).click();

		cy.get(circle)
			.should('have.length', 2)
			.eq(0)
			.should('have.css', 'border-color', defaultColor)
			.contains('1');
		cy.get(circle).eq(1).should('have.css', 'border-color', changingColor).contains('2');

		cy.wait(SHORT_DELAY_IN_MS);

		cy.get(circle).eq(0).should('have.css', 'border-color', defaultColor).contains('1');
		cy.get(circle).eq(1).should('have.css', 'border-color', defaultColor).contains('2');
	})

	it('Удаление', () => {

		cy.get('input').type('1').should('have.value', '1');
		cy.get(addButton).click();

		cy.wait(SHORT_DELAY_IN_MS);

		cy.get('input').type('2').should('have.value', '2');
		cy.get(addButton).click();

		cy.wait(SHORT_DELAY_IN_MS);

		cy.get(deleteButton).click();

		cy.get(circle)
			.should('have.length', 2)
			.eq(0)
			.should('have.css', 'border-color', defaultColor)
			.contains('1');
		cy.get(circle).eq(1).should('have.css', 'border-color', changingColor).contains('2');

		cy.wait(SHORT_DELAY_IN_MS);

		cy.get(circle)
			.should('have.length', 1)
			.eq(0)
			.should('have.css', 'border-color', defaultColor)
			.contains('1');
	})

	it("Очистка", function () {
		cy.get('input').type('1').should('have.value', '1');
		cy.get(addButton).click();
		cy.wait(SHORT_DELAY_IN_MS);

		cy.get('input').type('2').should('have.value', '2');
		cy.get(addButton).click();

		cy.wait(SHORT_DELAY_IN_MS);

		cy.get(clearButton).click();
		cy.get(circle).should('have.length', 0);
	});
});